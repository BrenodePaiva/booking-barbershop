"use server";

import ContainerTabel from "../components/container-table";
import { DataTable } from "../components/data-table";

import { columns, Users } from "./components/user-columns";

import { getUsers } from "@/data/users/get-users";

async function getData(): Promise<Users[]> {
  return await getUsers();
}

const UserListPage = async () => {
  const data = await getData();

  return (
    <ContainerTabel>
      <DataTable
        columns={columns}
        data={data}
        placeholder="Filtrar emails...."
        filterColumn="email"
      />
    </ContainerTabel>
  );
};

export default UserListPage;
