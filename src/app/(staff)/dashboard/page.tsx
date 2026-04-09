import { getTotalRevenue } from "@/data/dashboard/get-total-revenue";
import BarberRanking from "./components/barber-ranking";
import ComingBookings from "./components/coming-bookings";
import RevenueLineChart from "./components/revenue-line-chart";
import ServiceBarChart from "./components/service-bar-chart";
import StatusPieChart from "./components/status-pie-chart.";
import SummaryCard from "./components/summary-card";
import { getBookingsByStatus } from "@/data/dashboard/get-booking-by-status";
import { getPopularServices } from "@/data/dashboard/get-popular-services";
import { getWeeklyRevenue } from "@/data/dashboard/get-weekly-revenue";
import TesteDados from "./components/teste-dados";
import { getBarberRanking } from "@/data/dashboard/get-barber-raking";
import { getNextBookings } from "@/data/dashboard/get-next-bookings";

const DashboardPage = async () => {
  const [
    bookingStatus,
    totalRevenue,
    popularService,
    weeklyRevenue,
    barberRanking,
    nextBookings,
  ] = await Promise.all([
    getBookingsByStatus(),
    getTotalRevenue(),
    getPopularServices(),
    getWeeklyRevenue(),
    getBarberRanking(),
    getNextBookings(),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <div className="">
        <SummaryCard statusCount={bookingStatus} revenue={totalRevenue} />
      </div>

      {/* <TesteDados /> */}

      {/* <div className="w-[350px]">
        <ComingBookings />
      </div> */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <StatusPieChart chartData={bookingStatus} />
        <ServiceBarChart chartData={popularService} />
        <RevenueLineChart chartData={weeklyRevenue} />
      </div>

      {/* <div className="w-[280px]">
        <BarberRanking />
      </div> */}

      <div className="flex w-full flex-col gap-10 md:flex-row">
        <BarberRanking barbersData={barberRanking} />
        <ComingBookings bookings={nextBookings} />
      </div>
    </div>
  );
};

export default DashboardPage;
