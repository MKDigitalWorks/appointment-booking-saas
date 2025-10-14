import * as React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  interval?: number; // minutes
  minTime?: string;
  maxTime?: string;
}

export function TimePicker({
  value,
  onChange,
  disabled = false,
  className,
  interval = 30,
  minTime = '09:00',
  maxTime = '18:00',
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(value || '');

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const [minHour, minMinute] = minTime.split(':').map(Number);
    const [maxHour, maxMinute] = maxTime.split(':').map(Number);
    
    const startMinutes = minHour * 60 + minMinute;
    const endMinutes = maxHour * 60 + maxMinute;
    
    for (let minutes = startMinutes; minutes < endMinutes; minutes += interval) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onChange?.(time);
    setIsOpen(false);
  };

  const formatDisplayTime = (time: string) => {
    if (!time) return 'Select time';
    const [hour, minute] = time.split(':');
    const hour12 = parseInt(hour) % 12 || 12;
    const ampm = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full justify-start text-left font-normal"
      >
        <Clock className="mr-2 h-4 w-4" />
        {formatDisplayTime(selectedTime)}
      </Button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-auto">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={cn(
                  'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  selectedTime === time && 'bg-accent text-accent-foreground'
                )}
                onClick={() => handleTimeSelect(time)}
              >
                {formatDisplayTime(time)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
