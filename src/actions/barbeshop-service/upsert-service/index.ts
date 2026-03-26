"use server";
import { actionClient } from "@/lib/safe-action";
import { upsertBarbershopServiceSchema } from "./schema";
import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { convertToCents } from "@/app/helpers/money";
import { deleteImage, uploadImage } from "@/app/helpers/upload";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";

export const upsertBarbershopService = actionClient
  .inputSchema(upsertBarbershopServiceSchema)
  .action(
    async ({ parsedInput: { id, imageUrl, priceCents: price, ...data } }) => {
      const session = await checkUserSession();

      const canUpsertService = await hasAnyRole(session.user.id, [
        "admin",
        "gerente",
      ]);
      if (!canUpsertService) throw new Error("Unauthorized");

      const safeId = id ?? randomUUID();

      try {
        const priceCents = convertToCents(price);
        if (imageUrl) {
          const url = await uploadImage(imageUrl, safeId, "services");
          await db
            .insert(barberShopServiceTable)
            .values({ id: safeId, imageUrl: url, priceCents, ...data })
            .onConflictDoUpdate({
              target: barberShopServiceTable.id,
              set: { ...data, imageUrl: url, priceCents },
            });
        } else {
          await db
            .insert(barberShopServiceTable)
            .values({ id: safeId, priceCents, ...data })
            .onConflictDoUpdate({
              target: barberShopServiceTable.id,
              set: { ...data, priceCents },
            });
        }
        revalidatePath("/barbeshop-service");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (imageUrl) {
          await deleteImage(safeId, "services");
        }

        if (err.cause.code === "23505") {
          return {
            success: false,
            message: "Já existe um serviço com esse nome.",
          };
        }
        return {
          success: false,
          message: "Erro inesperado ao salvar o serviço.",
        };
      }
    },
  );
