import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { CheckRules } from "./components/check-rules";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { DataTable } from "../components/data-table";
import { columns, Payment } from "../components/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "829id52h",
      amount: 150,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ];
}

async function UserListPage() {
  const data = await getData();
  const userId = "rHNaUUJoIfHUT9NEGbpIAh3DVA1qSLFu";

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userRoles = await db.query.userRolesTable.findMany({
    where: (userRolesTable, { eq }) => eq(userRolesTable.userId, userId),
    with: {
      userRole: true,
    },
  });

  const roles = await db.query.rolesTable.findMany();

  return (
    <>
      <Card>
        <CardContent>
          <CheckRules
            allRoles={roles}
            userRoles={userRoles.map((r) => r.userRole.id)}
            userId={userId}
          />
        </CardContent>
      </Card>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default UserListPage;
