import Search from "@/components/search";
import SearchItem from "@/components/search-item";
import { getSearchItem } from "@/data/search-barbershop/get-search-item";
import { getSearchService } from "@/data/search-barbershop/get-search-service";

interface BarbershopsPageProps {
  searchParams: Promise<{
    barber?: string;
    service?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { barber, service } = await searchParams;
  const barbershops = await getSearchItem({ barber });
  const barbershopServices = await getSearchService({ service });
  return (
    <div>
      <div className="my-6 max-w-[500px] px-5 md:hidden">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{barber || service}
          &quot;
        </h2>

        <div className="mb-5 flex flex-wrap gap-4">
          {barbershops?.services.map((barbershop) => (
            <SearchItem key={barbershop.id} barbershopItem={barbershop} />
          ))}
        </div>

        <div className="mb-5 flex flex-wrap gap-4">
          {barbershops?.barbers.map((barbershop) => (
            <SearchItem key={barbershop.id} barbershopItem={barbershop} />
          ))}
        </div>

        <div className="mb-5 flex flex-wrap gap-4">
          {barbershopServices?.map((service) => (
            <SearchItem key={service.id} barbershopItem={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
