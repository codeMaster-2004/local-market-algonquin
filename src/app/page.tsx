import { Hero } from "@/components/Hero";
import { StoreHours } from "@/components/StoreHours";
import { Departments } from "@/components/Departments";
import { WeeklyAdMock } from "@/components/WeeklyAdMock";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <StoreHours />
        <Departments />
        <WeeklyAdMock />
      </main>
      <SiteFooter />
    </>
  );
}
