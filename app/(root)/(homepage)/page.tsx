import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";
import Slider from "@/components/Slider";

const images = [
  "/assets/main-slider/01.png",
  "/assets/main-slider/02.png",
  "/assets/main-slider/03.png",
];

export default async function Home() {
  return (
    <>
      <main className="w-full main flex-auto flex justify-center">
        <div className="container bg-white">
          <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <Slider images={images} />
          </div>
          <ProductSection />
        </div>
      </main>
    </>
  );
}
