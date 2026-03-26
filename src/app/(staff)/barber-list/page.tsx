"use server";

import ContainerTabel from "../components/container-table";
import { DataTable } from "../components/data-table";
import { Barbers, columns } from "./components/barber-columns";
import { getBarbers } from "@/data/barbers/get-barbers";

async function getData(): Promise<Barbers[]> {
  return await getBarbers();
}

const UserListPage = async () => {
  const data = await getData();

  return (
    <ContainerTabel>
      <DataTable columns={columns} data={data} />
    </ContainerTabel>
  );
};

export default UserListPage;
