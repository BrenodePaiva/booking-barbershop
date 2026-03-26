import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Search from "@/components/search";
import { quickSearchOptions } from "../constants/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServices } from "@/data/service-barbershop/get-services";
import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import { getBarbers } from "@/data/barbers/get-barbers";
import { getUserRoles } from "@/actions/role/get-user-roles";
import { redirect } from "next/navigation";
import { getUserBookings } from "@/data/bookings/get-user-bookings";
import { getRecomendedServices } from "@/data/service-barbershop/get-recomended-services";
import { ensureClienteRole } from "@/actions/role/ensure-cliente-role";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const services = await getServices();
  const recomendedServices = await getRecomendedServices();
  const barbers = await getBarbers();
  const bookings = await getUserBookings();

  if (session?.user.id) {
    await ensureClienteRole({ userId: session.user.id });
    const role = await getUserRoles(session.user.id);
    if (!role.includes("cliente")) {
      redirect("/dashboard");
    }
  }

  return (
    <div>
      <div className="">
        <div className="p-5 md:relative md:mb-5 md:grid md:h-full md:w-full md:grid-cols-2 md:gap-16">
          <Image
            alt="banner barbearia"
            src="/bghome.jpg"
            fill
            className="hidden md:block md:object-cover"
          />
          <div className="inset-0 z-10 hidden bg-black/85 md:absolute md:block" />

          <div className="z-20 md:max-w-[490px]">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name : "bem vindo"}
            </h2>
            <p>
              <span className="capitalize">
                {format(new Date(), "EEEE, dd ", { locale: ptBR })}
              </span>
              de
              <span className="capitalize">
                {format(new Date(), " MMMM", { locale: ptBR })}
              </span>
            </p>

            <div className="mt-6">
              <Search />
            </div>

            <div className="scrollbar-vintage mt-6 flex gap-3 overflow-x-auto pb-1">
              {quickSearchOptions.map((option) => (
                <Button variant="secondary" key={option.title} asChild>
                  <Link href={`/barbershop?service=${option.title}`}>
                    <Image
                      alt={option.title}
                      src={option.imageUrl}
                      width={16}
                      height={16}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="relative mt-6 h-[150px] w-full md:hidden">
              <Image
                alt="Banner Agende nos melhores com FSW Barber"
                src="/Banner-01.png"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {bookings.length > 0 && (
              <>
                <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
                  Agendamentos
                </h2>
                <div className="scrollbar-vintage flex gap-3 overflow-x-auto pb-1">
                  {bookings.map((booking) => (
                    <BookingItem
                      booking={booking}
                      key={booking.id}
                      width="min-w-[90%] md:min-w-full"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="z-20">
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Barbeiros
            </h2>
            <div className="scrollbar-vintage flex gap-4 overflow-auto pb-1">
              {barbers.map((barber) => (
                <BarbershopItem key={barber.id} barber={barber} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-5">
          <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
            Serviços
          </h2>
          <div className="scrollbar-vintage flex gap-4 overflow-x-auto pb-1">
            {services.map((service) => (
              <BarbershopItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="p-5">
          <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
            Recomendados
          </h2>
          <div className="scrollbar-vintage flex gap-4 overflow-x-auto pb-1">
            {recomendedServices.map((service) => (
              <BarbershopItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
