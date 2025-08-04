import { useId, useState, type FC } from 'react';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import type { DateRange } from 'react-day-picker';

type DatePickerProps =
  | {
      label?: string;
      mode: 'single';
      selected: Date | undefined;
      onChange: (date: Date | undefined) => void;
    }
  | {
      label?: string;
      mode: 'range';
      selected: DateRange | undefined;
      onChange: (range: DateRange | undefined) => void;
    };

const DatePicker: FC<DatePickerProps> = ({ label, mode, selected, onChange }) => {
  const inpId = useId();
  const [open, setOpen] = useState(false);

  const displayValue =
    mode === 'single'
      ? selected
        ? selected.toLocaleDateString()
        : 'Select date'
      : selected
      ? `${selected.from?.toLocaleDateString() || ''} - ${selected.to?.toLocaleDateString() || ''}`
      : 'Select date range';

  return (
    <>
      {label && <Label htmlFor={inpId}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button aria-label="select date" variant="outline" id={inpId} className="w-full justify-between">
            <span>{displayValue}</span>
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content" className="w-auto overflow-hidden p-0" align="start">
          {mode === 'single' ? (
            <Calendar
              mode="single"
              selected={selected as Date | undefined}
              captionLayout="dropdown"
              onSelect={date => {
                onChange(date);
                setOpen(false);
              }}
            />
          ) : (
            <Calendar
              mode="range"
              selected={selected as DateRange | undefined}
              captionLayout="dropdown"
              onSelect={range => {
                onChange(range);
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
