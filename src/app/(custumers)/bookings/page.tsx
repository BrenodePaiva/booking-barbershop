import BookingItem from "@/components/booking-item";
import SignInCard from "@/components/sign-in-card";
import { getCanceledBookings } from "@/data/bookings/get-canceled-bookings";
import { getConcluedBookings } from "@/data/bookings/get-conclued-bookings";
import { getConfirmedBookings } from "@/data/bookings/get-confirmed-bookings";
import { getPendingBookings } from "@/data/bookings/get-pending-bookings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Bookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <SignInCard />;
  }

  const pendingBookings = await getPendingBookings();
  const confirmedBookings = await getConfirmedBookings();
  const canceledBookings = await getCanceledBookings();
  const concludedBookings = await getConcluedBookings();

  return (
    <>
      <div className="space-y-3 p-5 lg:mx-auto lg:max-w-[700px]">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {pendingBookings.length === 0 &&
          confirmedBookings.length === 0 &&
          canceledBookings.length === 0 &&
          concludedBookings.length === 0 && (
            <p className="text-gray-400">Você não tem agendamentos.</p>
          )}
        {pendingBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Pendentes
            </h2>
            {pendingBookings.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </>
        )}

        {canceledBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Cancelados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
