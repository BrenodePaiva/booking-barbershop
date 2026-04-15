import { getServices } from "@/data/service-barbershop/get-services";
import ContainerTabel from "../components/container-table";
import { DataTable } from "../components/data-table";
import { columns, Services } from "./components/service-columns";
import ServiceCreateButton from "./components/service-create-button";

async function getData(): Promise<Services[]> {
  return await getServices();
}

const barberShopServicePage = async () => {
  const data = await getData();

  return (
    <ContainerTabel>
      <DataTable
        columns={columns}
        data={data}
        placeholder="Filtrar nome..."
        filterColumn="name"
      >
        <ServiceCreateButton />
      </DataTable>
    </ContainerTabel>
  );
};

export default barberShopServicePage;
