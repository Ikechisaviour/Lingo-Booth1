import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { authService } from '../../../services/api';
import { useAuthStore } from '../../../stores/authStore';

// Mock dependencies
jest.mock('../../../services/api');
jest.mock('../../../stores/authStore');
jest.mock('../../../stores/settingsStore', () => ({
  useSettingsStore: () => ({
    setLanguages: jest.fn(),
    setVoice: jest.fn(),
  }),
}));

// Mock Navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('LoginScreen', () => {
  const mockLogin = jest.fn();
  const mockClearGuestXP = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      guestXP: 0,
      clearGuestXP: mockClearGuestXP,
    });
  });

  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<LoginScreen />);
    expect(getByLabelText('login.email')).toBeTruthy();
    expect(getByLabelText('login.password')).toBeTruthy();
    expect(getByText('login.loginButton')).toBeTruthy();
  });

  it('shows error if login fails', async () => {
    (authService.login as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    const { getByLabelText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('login.email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('login.password'), 'password123');
    fireEvent.press(getByText('login.loginButton'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('navigates to LanguageSelect when "Try as Guest" is pressed', () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('login.tryAsGuest'));
    expect(mockNavigate).toHaveBeenCalledWith('LanguageSelect', { mode: 'guest' });
  });

  it('calls login store on successful login', async () => {
    const mockUserData = { token: 'fake-token', user: { id: '1', username: 'testuser', role: 'user' } };
    (authService.login as jest.Mock).mockResolvedValueOnce({ data: mockUserData });

    const { getByLabelText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('login.email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('login.password'), 'password123');
    fireEvent.press(getByText('login.loginButton'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        token: 'fake-token',
        user: mockUserData.user,
      });
    });
  });
});
