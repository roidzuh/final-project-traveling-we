import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-slate-700">{children}</main>
      <Footer />
    </>
  );
}
