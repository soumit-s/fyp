import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import Image from "next/image";

export default function Shop() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main>
        <NavBar className="w-2/3 mx-auto mb-4" />
        {/** Banner */}
        <div className="w-2/3 mx-auto">
          <div className="bg-black p-20 w-full rounded-2xl text-white overflow-hidden">
            <div className="text-xl mb-4">Short Term Rentals</div>
            <div className="text-4xl font-bold">Anywhere, Anytime</div>
          </div>
        </div>

        {/**  Categories */}
        <div className="w-2/3 mx-auto mt-8 mb-8">
          <h1 className="text-2xl font-bold mb-8">Categories</h1>
          <div className="flex flex-wrap gap-8">
            {Array(5)
              .fill(0)
              .map((c, idx) => {
                return (
                  <div
                    key={idx}
                    className="aspect-[4/5] w-52 rounded-xl p-4 bg-primary flex items-end relative overflow-hidden"
                  >
                    <Image
                      width={1200}
                      height={1200}
                      src="/images/camera_category_banner.jpg"
                      alt="Oops :("
                      className="absolute top-0 left-0 righht-0 bottom-0"
                    />
                    <span className="font-bold text-lg">Smartphone</span>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
