import { render, screen } from '@testing-library/react';
import { AuthInput } from '@/app/components/auth/AuthInput';
import '@testing-library/jest-dom';
import { FieldError } from 'react-hook-form';

describe('AuthInput', () => {
	it('renders input with correct props', () => {
		render(<AuthInput placeholder="Email" type="email" />);
		const input = screen.getByPlaceholderText('Email');
		expect(input).toHaveAttribute('type', 'email');
	});

	it('displays error message when provided', () => {
		const error = { message: 'Invalid email' } as FieldError;
		render(<AuthInput error={error} />);
		expect(screen.getByText('Invalid email')).toBeInTheDocument();
	});
});
