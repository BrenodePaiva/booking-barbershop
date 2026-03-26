import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userRelations = relations(userTable, ({ many, one }) => ({
  roles: many(userRolesTable),
  barber: one(barberTable, {
    fields: [userTable.id],
    references: [barberTable.userId],
  }),
  bookings: many(bookingTable),
}));

export const sessionTable = pgTable("session_table", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account_table", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verificationTable = pgTable("verification_table", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const rolesTable = pgTable("roles_table", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rolesTableRelations = relations(rolesTable, ({ many }) => ({
  users: many(userRolesTable),
}));

export const userRolesTable = pgTable("user_roles_table", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  roleId: uuid("role_id")
    .notNull()
    .references(() => rolesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRolesTableRelations = relations(userRolesTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userRolesTable.userId],
    references: [userTable.id],
  }),

  userRole: one(rolesTable, {
    fields: [userRolesTable.roleId],
    references: [rolesTable.id],
  }),
}));

export const barberTable = pgTable("barber_table", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" })
    .unique(),
  bio: text(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const barberRelations = relations(barberTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [barberTable.userId],
    references: [userTable.id],
  }),
  bookings: many(bookingTable),
  availability: many(barberAvailabilityTable),
  blocks: one(barberBlocksTable, {
    fields: [barberTable.id],
    references: [barberBlocksTable.barberId],
  }),
}));

export const barberAvailabilityEnum = pgEnum("barber_availability_enum", [
  "morning",
  "afternoon",
]);

export const barberAvailabilityTable = pgTable(
  "barber_availability_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    barberId: uuid("barber_id")
      .notNull()
      .references(() => barberTable.id, { onDelete: "cascade" }),
    dayOfWeek: integer("day_of_week").notNull(),
    slotType: barberAvailabilityEnum("slot_type").notNull(),
    start: text(),
    end: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    uniqueAvailability: uniqueIndex("unique_availability").on(
      table.barberId,
      table.dayOfWeek,
      table.slotType,
    ),
  }),
);

export const barberAvailabilityRelations = relations(
  barberAvailabilityTable,
  ({ one }) => ({
    barber: one(barberTable, {
      fields: [barberAvailabilityTable.barberId],
      references: [barberTable.id],
    }),
  }),
);

export const barberBlocksTable = pgTable("barber_blocks_table", {
  id: uuid().primaryKey().defaultRandom(),
  barberId: uuid("barber_id")
    .notNull()
    .references(() => barberTable.id, { onDelete: "cascade" })
    .unique(),
  start: timestamp().notNull(),
  end: timestamp().notNull(),
  reason: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const barberBlocksRelations = relations(
  barberBlocksTable,
  ({ one }) => ({
    barber: one(barberTable, {
      fields: [barberBlocksTable.barberId],
      references: [barberTable.id],
    }),
  }),
);

export const barberShopServiceTable = pgTable("barber_shop_service_table", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  description: text(),
  imageUrl: text("image_url"),
  priceCents: integer("price_cents").notNull(),
  isRecommended: boolean("is_recommended").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const barberShopServiceRelations = relations(
  barberShopServiceTable,
  ({ many }) => ({
    booking: many(bookingTable),
  }),
);

export const bookingStatusEnum = pgEnum("booking_status_enum", [
  "Pendente", // Aguardando confirmação
  "Confirmado", // Confirmado pelo barbeiro/gerente
  "Cancelado", // Cancelado pelo cliente ou barbeiro
  "Concluído", // Serviço realizado e finalizado
]);

export const bookingTable = pgTable("booking_table", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  barberId: uuid("barber_id")
    .notNull()
    .references(() => barberTable.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => barberShopServiceTable.id, { onDelete: "cascade" }),
  date: timestamp().notNull(),
  status: bookingStatusEnum("status").default("Pendente").notNull(),
  cancelReason: text("cancel_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const bookingRelations = relations(bookingTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bookingTable.userId],
    references: [userTable.id],
  }),
  barber: one(barberTable, {
    fields: [bookingTable.barberId],
    references: [barberTable.id],
  }),
  service: one(barberShopServiceTable, {
    fields: [bookingTable.serviceId],
    references: [barberShopServiceTable.id],
  }),
}));
