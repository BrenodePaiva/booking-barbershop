import { formatCentsToBRL } from "@/app/helpers/money";
import BarbershopSummary from "@/components/barbershop-summary";
import Header from "@/components/header";
import PhoneItem from "@/components/phone-item";
import ServiceItem from "@/components/service-item";
import { getBarbers } from "@/data/barbers/get-barbers";
import { getIdBarber } from "@/data/barbers/get-id-barber";
import { getIdService } from "@/data/service-barbershop/get-id-service";
import { getServices } from "@/data/service-barbershop/get-services";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import MobileButton from "./components/mobile-button";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const bService = await getIdService(id);
  const bBarber = await getIdBarber(id);

  if (!bService && !bBarber) {
    return notFound();
  }

  let dataBarbers;
  let dataServices;

  if (bService) {
    dataBarbers = await getBarbers();
  } else if (bBarber) {
    dataServices = await getServices();
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:flex lg:justify-center lg:gap-6 lg:p-5">
        <div className="lg:max-w-[700px] lg:flex-2">
          <div className="relative h-[250px] w-full lg:h-[487px]">
            {bService?.imageUrl || bBarber?.imageUrl ? (
              <Image
                alt={bService?.name ?? bBarber?.user.name ?? ""}
                src={`${bService?.imageUrl ?? bBarber?.imageUrl ?? ""}?t=${bService?.updatedAt ? bService.updatedAt.getTime() : bBarber?.updatedAt.getTime()}`}
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="h-full w-full bg-gray-500"></div>
            )}
            <div className="lg:hidden">
              <MobileButton />
            </div>
          </div>

          <div className="border-b border-solid p-5 lg:border-none">
            <h1 className="mb-3 text-xl font-bold">
              {bService?.name ?? bBarber?.user.name}
            </h1>
            <div className="lg:flex lg:justify-between">
              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" />
                <p className="text-sm">Endereço</p>
              </div>

              {bService?.priceCents && (
                <div className="ml-1 flex items-center gap-2">
                  <h2 className="text-primary font-bold">
                    {formatCentsToBRL(bService.priceCents)}
                  </h2>
                </div>
              )}
            </div>
          </div>

          {(bService?.description || bBarber?.bio) && (
            <div className="space-y-2 border-b border-solid p-5 lg:hidden">
              <h2 className="text-xs font-bold text-gray-400 uppercase">
                {bService?.description ? "Descrição" : "Bio"}
              </h2>
              <p className="text-justify text-sm">
                {bService?.description ?? bBarber?.bio}
              </p>
            </div>
          )}

          <div className="space-y-3 p-5 lg:hidden">
            <PhoneItem phone="21987556242" />
          </div>
        </div>

        <div className="hidden lg:block lg:max-w-[350px] lg:flex-1">
          <BarbershopSummary
            description={bService?.description}
            bio={bBarber?.bio}
          />
        </div>
      </div>

      <div className="space-y-3 border-t p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">
          {bService ? "Barbeiros" : "Serviços"}
        </h2>
        <div className="space-y-3 lg:grid lg:min-h-auto lg:grid-cols-2 lg:space-y-0 lg:gap-x-5 lg:gap-y-3">
          {bService &&
            dataBarbers?.map((barber) => (
              <ServiceItem
                key={barber.id}
                barber={barber}
                service={bService}
                isService={false}
              />
            ))}

          {bBarber &&
            dataServices?.map((service) => (
              <ServiceItem
                key={service.id}
                barber={bBarber}
                service={service}
                isService
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
