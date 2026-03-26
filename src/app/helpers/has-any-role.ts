import { getUserRoles } from "@/actions/role/get-user-roles";

type Roles = "gerente" | "barbeiro" | "admin" | "cliente";

export const hasAnyRole = async (userId: string, roleName: Roles[]) => {
  const roles = await getUserRoles(userId);

  return roleName.some((role) => roles.includes(role));
};
