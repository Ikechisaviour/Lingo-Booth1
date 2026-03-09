const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(to, token) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verifyLink = `${frontendUrl}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'Verify your Lingo Booth account',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ff6b35; margin: 0;">Lingo Booth</h1>
        </div>
        <h2 style="color: #1a1a2e; text-align: center;">Verify your email</h2>
        <p style="color: #4a5568; line-height: 1.6; text-align: center;">
          Thanks for signing up! Click the button below to verify your email address and activate your account.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verifyLink}" style="background: #ff6b35; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1rem; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 0.85rem; text-align: center;">
          This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };
