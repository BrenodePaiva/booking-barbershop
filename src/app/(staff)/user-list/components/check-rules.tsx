"use client";
import { addUserRole } from "@/actions/user/add-user-role";
import { deleteUserRole } from "@/actions/user/delete-user-role";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { rolesTable } from "@/db/schema";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

type Role = typeof rolesTable.$inferSelect;

interface CheckRulesProps {
  userId: string;
  userRoles: string[];
  allRoles: Role[];
}

export const CheckRules = ({
  userId,
  userRoles,
  allRoles,
}: CheckRulesProps) => {
  const { execute: executeAddUserRole } = useAction(addUserRole, {
    onSuccess: () => {
      alert("Role added successfully");
    },
    onError: (error) => {
      // alert(`Error adding role: ${error.error}`);
      alert(`Error adding role: ${JSON.stringify(error.error)}`);
    },
  });

  const { execute: executeDeleteUserRole } = useAction(deleteUserRole, {
    onSuccess: () => {
      alert("Role deleted successfully");
    },
    onError: (error) => {
      alert(`Error deleting role: ${error.error}`);
    },
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>(userRoles);

  const toggleRole = async (roleId: string) => {
    const hasRole = selectedRoles.includes(roleId);

    try {
      if (hasRole) {
        await executeDeleteUserRole({ userId, roleId });
        setSelectedRoles((prev) => prev.filter((r) => r !== roleId));
      } else {
        await executeAddUserRole({ userId, roleId });
        setSelectedRoles((prev) => [...prev, roleId]);
      }
    } catch (error) {
      alert(`Error updating role: ${error}`);
    }
    // setSelectedRoles((prev) =>
    //   checked ? [...prev, role.name] : prev.filter((r) => r !== role.name),
    // );

    // if (checked) {
    //   await executeAddUserRole({ userId, roleId: role.id });
    // } else {
    //   // executeDeleteUserRole({ userId, roleId: role.id });
    // }
  };

  return (
    <Card>
      <CardContent>
        {allRoles.map((role) => (
          <div className="flex flex-col gap-6" key={role.id}>
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
              <Checkbox
                id="toggle"
                checked={selectedRoles.includes(role.id)}
                onCheckedChange={() => toggleRole(role.id)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">{role.name}</p>
              </div>
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
