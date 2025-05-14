import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="bg-gray-light flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
