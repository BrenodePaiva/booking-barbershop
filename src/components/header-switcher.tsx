"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

const HeaderSwitcher = () => {
  const pathname = usePathname();
  const isBarbershop = pathname.startsWith("/barbershop/");

  return <>{!isBarbershop && <Header />}</>;
};

export default HeaderSwitcher;
