import { UpsertBarberBlocksSchema } from "@/actions/barber/upsert-barber-block/schema";

export const mapBlockToForm = (existingBlock: UpsertBarberBlocksSchema) => {
  return {
    barberId: existingBlock.barberId,
    range: {
      from: existingBlock.rangeStart,
      to: existingBlock.rangeEnd,
    },
    startTime: existingBlock.rangeStart?.toTimeString().slice(0, 5), // "09:00"
    endTime: existingBlock.rangeEnd?.toTimeString().slice(0, 5), // "18:00"
    reason: existingBlock.reason,
  };
};
