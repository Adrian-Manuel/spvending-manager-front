import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuButton from './MenuButton'; // Adjust path as needed
import menuIcon from './../../../assets/icons/Menu-displayer.svg';
import closeIcon from './../../../assets/icons/Go-Back.svg'; // Assuming this is the correct path for close icon

// Mock CSS Modules
vi.mock('./MenuButton.module.css', () => ({
    default: {
        menuButton: 'mockedMenuButton',
        hidden: 'mockedHidden', // Make sure this matches the class name used for hiding
    },
    // If you have named exports from CSS module, mock them too:
    // menuButton: 'mockedMenuButton',
    // hidden: 'mockedHidden',
}));


describe('MenuButton Component', () => {
    it('renders with menu icon, correct alt text, and is visible when isAbove is false and no onClick', () => {
        render(<MenuButton isAbove={false} />);
        const button = screen.getByRole('button', { name: /expand menu/i });
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass('mockedHidden');

        const img = screen.getByAltText('Expand menu') as HTMLImageElement;
        expect(img.src).toContain(menuIcon);
    });

    it('renders with close icon, correct alt text, and IS HIDDEN when isAbove is true and no onClick', () => {
        render(<MenuButton isAbove={true} />); // onClick is undefined

        // Button might be hard to get by role if it's considered hidden.
        // Let's query for the img alt text first.
        const img = screen.getByAltText('Collapse menu') as HTMLImageElement;
        expect(img.src).toContain(closeIcon);

        const button = screen.getByRole('button', { name: /collapse menu/i });
        expect(button).toBeInTheDocument(); // It's in the DOM
        expect(button).toHaveClass('mockedHidden'); // But it has the hidden class
    });

    it('renders with close icon, correct alt text, and IS VISIBLE when isAbove is true AND onClick IS provided', () => {
        const mockOnClick = vi.fn();
        render(<MenuButton isAbove={true} onClick={mockOnClick} />);

        const button = screen.getByRole('button', { name: /collapse menu/i });
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass('mockedHidden');

        const img = screen.getByAltText('Collapse menu') as HTMLImageElement;
        expect(img.src).toContain(closeIcon);
    });

    it('calls onClick handler when clicked (and onClick is provided)', () => {
        const mockOnClick = vi.fn();
        render(<MenuButton isAbove={false} onClick={mockOnClick} />);
        const button = screen.getByRole('button', { name: /expand menu/i });
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies correct aria-label and title attributes based on isAbove and onClick presence', () => {
        // Case 1: isAbove = false (implies Expand)
        const { rerender } = render(<MenuButton isAbove={false} />);
        let buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveAttribute('aria-label', 'Expand menu');
        expect(buttonElement).toHaveAttribute('title', 'Expand menu');

        // Case 2: isAbove = true, onClick provided (implies Collapse, button is interactive toggle)
        rerender(<MenuButton isAbove={true} onClick={() => {}} />);
        buttonElement = screen.getByRole('button'); // Re-query after re-render
        expect(buttonElement).toHaveAttribute('aria-label', 'Collapse menu');
        expect(buttonElement).toHaveAttribute('title', 'Collapse menu');

        // Case 3: isAbove = true, no onClick (implies Collapse, button is present but hidden by class)
        rerender(<MenuButton isAbove={true} />);
        buttonElement = screen.getByRole('button'); // Re-query
        expect(buttonElement).toHaveAttribute('aria-label', 'Collapse menu');
        expect(buttonElement).toHaveAttribute('title', 'Collapse menu');
    });
});
