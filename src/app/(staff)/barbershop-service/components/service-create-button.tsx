"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import ServiceUpsertContent from "./service-upsert-content";

const ServiceCreateButton = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
      <DialogTrigger asChild>
        <Button>
          <CircleFadingPlus /> Adicionar Serviço
        </Button>
      </DialogTrigger>

      <ServiceUpsertContent setDialogOpen={setOpenCreateDialog} />
    </Dialog>
  );
};

export default ServiceCreateButton;
