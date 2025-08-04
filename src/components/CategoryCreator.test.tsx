import CategoryCreator from './CategoryCreator';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const addCategoryMock = vi.fn();

vi.mock('@/stores/useTransactionsStore.ts', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTransactionsStore: (selector: any) =>
    selector({
      addCategory: addCategoryMock,
      categories: [],
    }),
}));

describe('CategoryCreator', () => {
  beforeEach(() => {
    addCategoryMock.mockClear();
  });

  it('shows errors when validation fails', async () => {
    render(<CategoryCreator />);

    await userEvent.click(screen.getByText('Create new category'));
    await userEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-content')).toBeInTheDocument();
  });

  it('calls addCategory and clears inputs', async () => {
    render(<CategoryCreator />);

    await userEvent.click(screen.getByText('Create new category'));

    const inputTitle = screen.getByTestId('category-title');
    await userEvent.type(inputTitle, 'Food');

    await userEvent.click(screen.getByText('Save'));

    expect(addCategoryMock).toHaveBeenCalledWith({ title: 'Food', color: expect.any(String) });
    expect((inputTitle as HTMLInputElement).value).toBe('');
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });
});
