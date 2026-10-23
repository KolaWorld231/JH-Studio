import { SiteHeader } from "@/components/site-header";
import { KaNav } from "@/components/ka-nav";

export default function KnittedArchitectureLayout({ children }: LayoutProps<"/knitted-architecture">) {
  return (
    <>
      <SiteHeader divisionLabel="Knitted Architecture" />
      <KaNav />
      <main>{children}</main>
    </>
  );
}
