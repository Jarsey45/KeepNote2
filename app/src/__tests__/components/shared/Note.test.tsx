import { render, screen, fireEvent } from '@testing-library/react';
import Note from '@/app/components/shared/notes/Note';

jest.mock('@/utils/_emitter', () => ({
	eventEmitter: {
		emit: jest.fn(),
	},
}));

describe('Note', () => {
	const defaultProps = {
		id: '1',
		title: 'Test Note',
		content: 'Test Content',
		color: 'bg-pink-200',
	};

	it('renders note with correct content', () => {
		render(<Note {...defaultProps} />);
		expect(screen.getByText('Test Note')).toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('shows menu on more button click', () => {
		render(<Note {...defaultProps} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('edit')).toBeInTheDocument();
		expect(screen.getByText('delete')).toBeInTheDocument();
	});
});
