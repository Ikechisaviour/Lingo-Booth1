process.env.JWT_SECRET = 'test-secret';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../models/User', () => ({
  findById: jest.fn(),
}));

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken, isAdmin, requireRecentAuth } = require('../middleware/auth');

const createResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe('auth middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects requests without a bearer token', async () => {
    const req = { header: jest.fn(() => undefined) };
    const res = createResponse();
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches active users and continues', async () => {
    const user = { _id: 'user-1', role: 'user', status: 'active' };
    jwt.verify.mockReturnValue({ userId: 'user-1' });
    User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });
    const req = { header: jest.fn(() => 'Bearer token') };
    const res = createResponse();
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(req.userId).toBe('user-1');
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('blocks suspended users', async () => {
    jwt.verify.mockReturnValue({ userId: 'user-1' });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'user-1', status: 'suspended' }),
    });
    const req = { header: jest.fn(() => 'Bearer token') };
    const res = createResponse();
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Account suspended' });
    expect(next).not.toHaveBeenCalled();
  });

  it('allows admins through admin guard', () => {
    const req = { user: { role: 'admin' } };
    const res = createResponse();
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('rejects non-admins from admin guard', () => {
    const req = { user: { role: 'user' } };
    const res = createResponse();
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. Admin only.' });
    expect(next).not.toHaveBeenCalled();
  });

  describe('verifyToken authAt claim', () => {
    it('attaches authAt from token to request', async () => {
      const user = { _id: 'user-1', role: 'user', status: 'active' };
      const authAt = Math.floor(Date.now() / 1000) - 60;
      jwt.verify.mockReturnValue({ userId: 'user-1', authAt, iat: authAt });
      User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });
      const req = { header: jest.fn(() => 'Bearer token') };
      const res = createResponse();
      const next = jest.fn();

      await verifyToken(req, res, next);

      expect(req.authAt).toBe(authAt);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('falls back to iat when authAt is missing (legacy tokens)', async () => {
      const user = { _id: 'user-1', role: 'user', status: 'active' };
      const iat = Math.floor(Date.now() / 1000) - 60;
      jwt.verify.mockReturnValue({ userId: 'user-1', iat });
      User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });
      const req = { header: jest.fn(() => 'Bearer token') };
      const res = createResponse();
      const next = jest.fn();

      await verifyToken(req, res, next);

      expect(req.authAt).toBe(iat);
    });
  });

  describe('requireRecentAuth', () => {
    it('passes when authAt is within the window', () => {
      const req = { authAt: Math.floor(Date.now() / 1000) - 60 };
      const res = createResponse();
      const next = jest.fn();

      requireRecentAuth(15)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('returns STEP_UP_REQUIRED when authAt is too old', () => {
      const req = { authAt: Math.floor(Date.now() / 1000) - 16 * 60 };
      const res = createResponse();
      const next = jest.fn();

      requireRecentAuth(15)(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        code: 'STEP_UP_REQUIRED',
        maxAgeMinutes: 15,
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('returns STEP_UP_REQUIRED when authAt is missing entirely', () => {
      const req = {};
      const res = createResponse();
      const next = jest.fn();

      requireRecentAuth(15)(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'STEP_UP_REQUIRED' }));
      expect(next).not.toHaveBeenCalled();
    });
  });
});
