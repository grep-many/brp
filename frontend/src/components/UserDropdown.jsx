import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DarkModeButton from "./DarkModeButton"

const UserDropdown = ({ user, logout }) => {

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="peer/menu-button flex items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg grayscale bg-muted flex items-center justify-center">
            <AvatarFallback className="rounded-lg text-xs font-medium bg-primary text-background">
              {(user.name?.trim().split(' ').length > 1
                ? user.name.split(' ')[0][0] + user.name.split(' ')[1][0]
                : user.name[0]
              )?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Avatar className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <AvatarFallback className="rounded-lg text-xs font-medium">
                {(user.name?.trim().split(' ').length > 1
                  ? user.name.split(' ')[0][0] + user.name.split(' ')[1][0]
                  : user.name[0]
                )?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          <DarkModeButton/>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
