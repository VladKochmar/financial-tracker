import DatePicker from './DatePicker';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('DatePicker', () => {
  it('renders label and default text in single mode', () => {
    render(<DatePicker label="Some label" mode="single" selected={undefined} onChange={() => {}} />);

    expect(screen.getByText('Some label')).toBeInTheDocument();
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  it('renders label and default text in range mode', () => {
    render(<DatePicker label="Date range label" mode="range" selected={undefined} onChange={() => {}} />);

    expect(screen.getByText('Date range label')).toBeInTheDocument();
    expect(screen.getByText('Select date range')).toBeInTheDocument();
  });

  it('calls onChange and close popover in single mode', async () => {
    const handleChange = vi.fn();

    render(<DatePicker mode="single" selected={undefined} onChange={handleChange} />);

    await userEvent.click(screen.getByLabelText(/select date/i));

    const day = screen.getByText('25');
    await userEvent.click(day);

    expect(handleChange).toHaveBeenCalled();
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it("calls onChange and doesn't close popover in range mode", async () => {
    const handleChange = vi.fn();

    render(<DatePicker mode="range" selected={undefined} onChange={handleChange} />);

    await userEvent.click(screen.getByLabelText(/select date/i));

    const from = screen.getByText('21');
    await userEvent.click(from);

    const to = screen.getByText('25');
    await userEvent.click(to);

    expect(handleChange).toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });
});
