"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { rolesTable } from "@/db/schema";
import { addUserRole } from "@/actions/user/add-user-role";
import { useAction } from "next-safe-action/hooks";
import { deleteUserRole } from "@/actions/user/delete-user-role";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllRoles } from "@/actions/role/get-all-roles";
import { Users } from "./user-columns";
import BarberUpsertDialogContent from "../../components/barber-upsert-dialog-content";
import { protectUser } from "@/app/constants/protect-user";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import BarberRemoveContent from "./role-barber-remove-content";

type Role = typeof rolesTable.$inferSelect;

interface RoleDialogContentProps {
  user: Users;
  userRoles: string[];
}

const RoleDialogContent = ({ user, userRoles }: RoleDialogContentProps) => {
  const [allRoles, setAllRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setAllRoles(data);
      } catch (err) {
        alert("Erro ao buscar roles:" + err);
      }
    };
    fetchRoles();
  }, []);

  const { execute: executeAddUserRole } = useAction(addUserRole, {
    onSuccess: () => {
      toast.success("Permissão adicionada com sucesso");
    },
    onError: (error) => {
      toast.error(
        `Error ao adicionar permissão: ${JSON.stringify(error.error)}`,
      );
    },
  });
  const { execute: executeDeleteUserRole } = useAction(deleteUserRole, {
    onSuccess: () => {
      toast.success("Permissão removida com sucesso");
    },
    onError: (error) => {
      toast.error(`Error ao remover permissão: ${JSON.stringify(error.error)}`);
    },
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>(userRoles);
  const [openBarberDialog, setOpenBarberDialog] = useState(false);
  const [openRemoveBarberAlert, setOpenRemoveBarberAlert] = useState(false);

  const toggleRole = (roleId: string) => {
    const hasRole = selectedRoles.includes(roleId);

    try {
      if (hasRole && roleId == "3b2d3b8f-d656-4825-8020-1c5e93d0cd64") {
        setOpenRemoveBarberAlert(true);
      } else if (hasRole) {
        executeDeleteUserRole({ userId: user.id, roleId });
        setSelectedRoles((prev) => prev.filter((id) => id !== roleId));
      } else {
        if (roleId == "3b2d3b8f-d656-4825-8020-1c5e93d0cd64") {
          setOpenBarberDialog(true);
        } else {
          executeAddUserRole({ userId: user.id, roleId });
          setSelectedRoles((prev) => [...prev, roleId]);
        }
      }
    } catch (err) {
      alert("Erro ao alterar role:" + err);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gerenciar Permissões</DialogTitle>
        <DialogDescription>
          Gerencie as permissões do usuário.
        </DialogDescription>
      </DialogHeader>
      <Card>
        <CardContent>
          {allRoles.map((role) => (
            <div className="flex flex-col gap-6" key={role.id}>
              <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                <Checkbox
                  id="toggle"
                  disabled={
                    user.id === protectUser.userId &&
                    role.name === protectUser.roleName
                  }
                  title={
                    user.id === protectUser.userId &&
                    role.name === protectUser.roleName
                      ? "Não é possivel remover esta permissão desse usuário"
                      : undefined
                  }
                  checked={selectedRoles.includes(role.id)}
                  onCheckedChange={() => toggleRole(role.id)}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium capitalize">
                    {role.name}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={openBarberDialog} onOpenChange={setOpenBarberDialog}>
        <BarberUpsertDialogContent
          setOpenDialog={setOpenBarberDialog}
          defaultValues={{ name: user.name, id: user.id }}
          addRole={() => {
            executeAddUserRole({
              userId: user.id,
              roleId: "3b2d3b8f-d656-4825-8020-1c5e93d0cd64",
            });
            setSelectedRoles((prev) => [
              ...prev,
              "3b2d3b8f-d656-4825-8020-1c5e93d0cd64",
            ]);
          }}
        />
      </Dialog>

      <AlertDialog
        open={openRemoveBarberAlert}
        onOpenChange={setOpenRemoveBarberAlert}
      >
        <BarberRemoveContent
          userId={user.id}
          roleId="3b2d3b8f-d656-4825-8020-1c5e93d0cd64"
          setOpenAlert={setOpenRemoveBarberAlert}
          removeRole={() => {
            setSelectedRoles((prev) =>
              prev.filter(
                (id) => id !== "3b2d3b8f-d656-4825-8020-1c5e93d0cd64",
              ),
            );
          }}
        />
      </AlertDialog>
    </DialogContent>
  );
};

export default RoleDialogContent;
