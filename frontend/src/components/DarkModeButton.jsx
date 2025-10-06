import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import useTheme from '../hooks/useTheme';

const DarkModeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      className="cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? (
        <Sun className="!size-5" />
      ) : (
        <Moon className="!size-5" />
      )}
    </Button>
  );
};

export default DarkModeButton;
