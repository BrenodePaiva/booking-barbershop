import { deleteService } from "@/actions/barbeshop-service/delete-service";
import { DeleteServiceSchema } from "@/actions/barbeshop-service/delete-service/schema";
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
import { toast } from "sonner";

interface ServiceDeleteContentProps {
  serviceId: DeleteServiceSchema;
}

const ServiceDeleteContent = ({ serviceId }: ServiceDeleteContentProps) => {
  const { execute: executeDeleteService } = useAction(deleteService, {
    onSuccess: () => {
      toast.success("Serviço excluido com sucesso");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o serviço");
    },
  });

  const handleConfirmButton = () => {
    executeDeleteService(serviceId);
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription className="text-destructive font-semibold">
          Você está prestes a excluir este serviço. Esta ação não pode ser
          desfeita. Deseja continuar?
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

export default ServiceDeleteContent;
