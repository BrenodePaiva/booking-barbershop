import { deleteService } from "@/actions/barbeshop-service/delete-service";
import { DeleteServiceSchema } from "@/actions/barbeshop-service/delete-service/schema";
import { deleteUserRole } from "@/actions/user/delete-user-role";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface BarberRemoveContentProps {
  userId: string;
  roleId: string;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
  removeRole?: () => void;
}

const BarberRemoveContent = ({
  userId,
  roleId,
  setOpenAlert,
  removeRole,
}: BarberRemoveContentProps) => {
  const { execute: executeRemoveUserRole } = useAction(deleteUserRole, {
    onSuccess: () => {
      setOpenAlert(false);
      removeRole?.();
      toast.success("Permissão removida com sucesso");
    },
    onError: (error) => {
      toast.error(`Error ao remover permissão: ${JSON.stringify(error.error)}`);
    },
  });

  const handleConfirmButton = () => {
    executeRemoveUserRole({ userId, roleId });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription className="text-destructive font-semibold">
          Você está prestes a remover este barbeiro. Todos os agendamentos
          associados serão perdidos. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirmButton}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default BarberRemoveContent;
