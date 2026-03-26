import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { ServiceForm } from "./service-columns";
import ServiceUpsertContent from "./service-upsert-content";
import ServiceDeleteContent from "./service-delete-content";

interface ServiceDropdownMenuProps {
  service: ServiceForm;
}

const ServiceDropdownMenu = ({ service }: ServiceDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                <PencilLine /> Editar
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <Trash2 /> Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <ServiceUpsertContent
          defaultValues={service}
          setDialogOpen={setEditDialogOpen}
        />
      </Dialog>
      <ServiceDeleteContent serviceId={{ id: service.id }} />
    </AlertDialog>
  );
};

export default ServiceDropdownMenu;
