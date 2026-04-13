import { formatCentsToBRL } from "@/app/helpers/money";
import BarbershopSummary from "@/components/barbershop-summary";
import Header from "@/components/header";
import PhoneItem from "@/components/phone-item";
import ServiceItem from "@/components/service-item";
import SidebarSheet from "@/components/sidebar-sheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getBarbers } from "@/data/barbers/get-barbers";
import { getIdBarber } from "@/data/barbers/get-id-barber";
import { getIdService } from "@/data/service-barbershop/get-id-service";
import { getServices } from "@/data/service-barbershop/get-services";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MobileButton from "./components/mobile-button";
import { Separator } from "@/components/ui/separator";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const barbershopService = await getIdService(id);
  const barbershopBarber = await getIdBarber(id);

  if (!barbershopService && !barbershopBarber) {
    return notFound();
  }

  let dataBarbers;
  let dataServices;

  if (barbershopService) {
    dataBarbers = await getBarbers();
  } else if (barbershopBarber) {
    dataServices = await getServices();
  }

  if (!barbershopService && !barbershopBarber) {
    return notFound();
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:flex lg:justify-center lg:gap-6 lg:p-5">
        <div className="lg:max-w-[700px] lg:flex-2">
          <div className="relative h-[250px] w-full lg:h-[487px]">
            <Image
              alt={barbershopService?.name ?? barbershopBarber?.user.name ?? ""}
              src={
                barbershopService?.imageUrl ?? barbershopBarber?.imageUrl ?? ""
              }
              fill
              className="object-cover object-top"
            />

            <div className="lg:hidden">
              <MobileButton />
            </div>
          </div>

          <div className="border-b border-solid p-5 lg:border-none">
            <h1 className="mb-3 text-xl font-bold">
              {barbershopService?.name ?? barbershopBarber?.user.name}
            </h1>
            <div className="lg:flex lg:justify-between">
              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" />
                <p className="text-sm">Endereço</p>
              </div>

              {barbershopService?.priceCents && (
                <div className="ml-1 flex items-center gap-2">
                  <h2 className="text-primary font-bold">
                    {formatCentsToBRL(barbershopService.priceCents)}
                  </h2>
                </div>
              )}
            </div>
          </div>

          {(barbershopService?.description || barbershopBarber?.bio) && (
            <div className="space-y-2 border-b border-solid p-5 lg:hidden">
              <h2 className="text-xs font-bold text-gray-400 uppercase">
                {barbershopService?.description ? "Descrição" : "Bio"}
              </h2>
              <p className="text-justify text-sm">
                {barbershopService?.description ?? barbershopBarber?.bio}
              </p>
            </div>
          )}

          {/* <div className="space-y-3 border-b border-solid p-5 lg:border-none">
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              {barbershopService ? "Barbeiros" : "Serviços"}
            </h2>
            <div className="space-y-3 lg:grid lg:min-h-auto lg:grid-cols-2 lg:space-y-0 lg:gap-x-5 lg:gap-y-3">
              {barbershopService &&
                dataBarbers?.map((barber) => (
                  <ServiceItem
                    key={barber.id}
                    barber={barber}
                    service={barbershopService}
                    isService={false}
                  />
                ))}

              {barbershopBarber &&
                dataServices?.map((service) => (
                  <ServiceItem
                    key={service.id}
                    barber={barbershopBarber}
                    service={service}
                    isService
                  />
                ))}
            </div>
          </div> */}

          <div className="space-y-3 p-5 lg:hidden">
            <PhoneItem phone="21987556242" />
          </div>
        </div>

        <div className="hidden lg:block lg:max-w-[350px] lg:flex-1">
          <BarbershopSummary
            description={barbershopService?.description}
            bio={barbershopBarber?.bio}
          />
        </div>
      </div>

      <div className="space-y-3 border-t p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">
          {barbershopService ? "Barbeiros" : "Serviços"}
        </h2>
        <div className="space-y-3 lg:grid lg:min-h-auto lg:grid-cols-2 lg:space-y-0 lg:gap-x-5 lg:gap-y-3">
          {barbershopService &&
            dataBarbers?.map((barber) => (
              <ServiceItem
                key={barber.id}
                barber={barber}
                service={barbershopService}
                isService={false}
              />
            ))}

          {barbershopBarber &&
            dataServices?.map((service) => (
              <ServiceItem
                key={service.id}
                barber={barbershopBarber}
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
