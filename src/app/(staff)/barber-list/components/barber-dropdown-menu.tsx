import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClockAlert,
  ClockCheck,
  MoreHorizontal,
  PencilLine,
} from "lucide-react";
import { useState } from "react";
import BarberHoursUpsertContent from "./barber-hours-upsert-content";
import {
  barberAvailabilityTable,
  barberBlocksTable,
  barberTable,
  userTable,
} from "@/db/schema";
import BarberBlocksUpsertContent from "./barber-blocks-upsert-content";
import { mapBlockToForm } from "@/app/helpers/map-block-to-form";
import BarberUpsertDialogContent from "../../components/barber-upsert-dialog-content";

interface BarberDropdownMenuProps {
  barber: typeof barberTable.$inferSelect & {
    user: typeof userTable.$inferSelect;
    availability: (typeof barberAvailabilityTable.$inferSelect)[];
    blocks: typeof barberBlocksTable.$inferSelect;
  };
}

const BarberDropdownMenu = ({ barber }: BarberDropdownMenuProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
            <PencilLine /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setOpenAvailability(true)}>
            <ClockCheck /> Horários
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setOpenBlock(true)}>
            <ClockAlert /> Indisponível
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <BarberUpsertDialogContent
          defaultValues={{ name: barber.user.name, id: barber.userId }}
          setOpenDialog={setOpenEdit}
        />
      </Dialog>

      <Dialog open={openAvailability} onOpenChange={setOpenAvailability}>
        <BarberHoursUpsertContent
          defaultValues={{
            availability: barber.availability,
            barberId: barber.id,
          }}
          setDialogOpen={setOpenAvailability}
        />
      </Dialog>

      <Dialog open={openBlock} onOpenChange={setOpenBlock}>
        <BarberBlocksUpsertContent
          setDialogOpen={setOpenBlock}
          defaultValues={mapBlockToForm({
            ...barber.blocks,
            barberId: barber.id,
            rangeStart: barber.blocks?.start,
            rangeEnd: barber.blocks?.end,
          })}
        />
      </Dialog>
    </>
  );
};

export default BarberDropdownMenu;
