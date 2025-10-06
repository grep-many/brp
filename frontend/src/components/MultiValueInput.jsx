import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus} from 'lucide-react';
import { useRef, useState, useMemo } from 'react';

const MultiValueInput = ({
  id,
  name,
  label,
  placeholder,
  value = [],
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Compute if the current input is valid for adding (not empty & no duplicates)
  const isValid = useMemo(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return false;

    const newItems = trimmed
      .split(/[\s,]+/)
      .filter((v) => v && !value.includes(v));
    return newItems.length > 0;
  }, [inputValue, value]);

  // Add the current input to the array
  const add = () => {
    if (!isValid) return;

    const trimmed = inputValue.trim();
    const newItems = trimmed
      .split(/[\s,]+/)
      .filter((v) => v && !value.includes(v));

    onChange(name, [...value, ...newItems]);
    setInputValue('');
    inputRef.current?.focus();
  };

  // Handle Enter / Comma
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'NumpadEnter') {
      e.preventDefault();
      add();
    }
  };

  // Remove a single item
  const remove = (itemToRemove) => {
    const updated = value.filter((item) => item !== itemToRemove);
    onChange(name, updated);
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id || name}>{label}</Label>}

      {/* Render current values */}
      <div className={"max-h-[10vh] overflow-auto flex flex-wrap gap-1 "+(value.length>0&&"py-1")}>
        {value.map((item, index) => (
          <Badge
            key={index}
            onClick={() => remove(item)}
            className="flex items-center gap-1 select-none cursor-pointer hover:text-red-500"
          >
            {item}
          </Badge>
        ))}
      </div>

      {/* Input and Add button */}
      <div className="flex items-center gap-4 mt-2">
        <Input
          ref={inputRef}
          id={id || name}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="w-8 h-8 p-0" onClick={add} disabled={!isValid}>
          <CirclePlus />
        </Button>
      </div>
    </div>
  );
};

export default MultiValueInput;
