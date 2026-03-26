import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LockKeyhole, MoreHorizontal } from "lucide-react";
import RoleDialogContent from "./role-dialog-content";
import { Users } from "./user-columns";

interface UserDropdownMenuProps {
  user: Users;
}

const UserDropdownMenu = ({ user }: UserDropdownMenuProps) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <LockKeyhole /> Permissões
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <RoleDialogContent
        user={user}
        userRoles={user.roles.map((role) => role.roleId)}
      />
    </Dialog>
  );
};

export default UserDropdownMenu;
