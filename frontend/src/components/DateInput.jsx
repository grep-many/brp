import { useState, useEffect } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function formatDate(date) {
  if (!date) return '';

  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return ''; // Invalid date

  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}


function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Controlled DateInput component
 * Props:
 * - id: string
 * - label: string
 * - value: Date | null
 * - onChange: function(Date | null)
 * - placeholder: string
 */
const DateInput = ({ id, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value || new Date());
  const [inputValue, setInputValue] = useState(formatDate(value));

  // Keep input value in sync when `value` changes
  useEffect(() => {
    setInputValue(formatDate(value));
    if (value) setMonth(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newDate = new Date(e.target.value);
    setInputValue(e.target.value);

    if (isValidDate(newDate)) {
      onChange && onChange(newDate);
      setMonth(newDate);
    } else if (e.target.value === '') {
      onChange && onChange(null);
    }
  };

  return (
    <div className="my-2">
      <div className="relative flex gap-2">
        <Input
          id={id}
          placeholder={placeholder || 'Select a date'}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="bg-background pr-10"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={`${id}-picker`}
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                onChange && onChange(selectedDate);
                setInputValue(formatDate(selectedDate));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateInput;
