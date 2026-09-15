import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { WeeklyAdMock } from "@/components/WeeklyAdMock";

export const metadata: Metadata = {
  title: "Weekly deals",
  description:
    "Browse this week's specials by department at Local Market Shop & Save in Algonquin.",
};

export default function DealsPage() {
  return (
    <>
      <main className="flex-1">
        <WeeklyAdMock />
      </main>
      <SiteFooter />
    </>
  );
}
