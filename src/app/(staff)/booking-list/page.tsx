import { getBarberBookings } from "@/data/bookings/get-barber-bookings";
import BookingAccordion from "./components/booking-accordion";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { getAllBookings } from "@/data/bookings/get-all-bookings";
import { getUserRoles } from "@/actions/role/get-user-roles";

const BookingListPage = async () => {
  const session = await checkUserSession();
  if (!session) {
    return;
  }
  const role = await getUserRoles(session.user.id);

  let data;

  if (!role.includes("barbeiro")) {
    data = await getAllBookings();
  } else {
    data = await getBarberBookings();
  }

  return <BookingAccordion bookings={data} />;
};

export default BookingListPage;
