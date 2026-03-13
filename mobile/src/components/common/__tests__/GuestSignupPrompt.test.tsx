import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import GuestSignupPrompt from '../GuestSignupPrompt';
import { useAuthStore } from '../../../stores/authStore';

// Mock dependencies
jest.mock('../../../stores/authStore');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

const mockLogout = jest.fn();

describe('GuestSignupPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not show when user is not a guest', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isGuest: false,
      logout: mockLogout,
    });

    const { queryByText } = render(<GuestSignupPrompt />);
    expect(queryByText('Ready to save your progress?')).toBeNull();
  });

  it('shows after delay when user is a guest', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isGuest: true,
      logout: mockLogout,
    });

    const { queryByText } = render(<GuestSignupPrompt />);

    // Initially hidden
    expect(queryByText('Ready to save your progress?')).toBeNull();

    // Fast-forward 3 minutes
    act(() => {
      jest.advanceTimersByTime(3 * 60 * 1000);
    });

    expect(queryByText('Ready to save your progress?')).toBeTruthy();
  });

  it('calls logout when Create Account is pressed', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isGuest: true,
      logout: mockLogout,
    });

    const { getByText } = render(<GuestSignupPrompt />);

    act(() => {
      jest.advanceTimersByTime(3 * 60 * 1000);
    });

    fireEvent.press(getByText('Create Account'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
