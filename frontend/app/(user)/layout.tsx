import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-2/3 mx-auto min-h-[90vh]">
        <NavBar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
