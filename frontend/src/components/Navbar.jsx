import UserDropdown from './UserDropdown';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 border-b bg-background/70 backdrop-blur-2xl select-none">
      {/* Left: Logo + App Name */}
      <div
        className="flex items-center gap-2  cursor-pointer"
        onClick={() => navigate('/')}
      >
        <span className="text-lg font-semibold">BRP</span>
      </div>

      {/* Right: Dark Mode + User Dropdown (grouped together) */}
      <div className="flex items-center gap-2 ml-auto  cursor-pointer">
        {user && <UserDropdown user={user} logout={logout} />}
      </div>
    </nav>
  );
};

export default Navbar;
