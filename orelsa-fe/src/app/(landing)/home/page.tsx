import TheRange from "@/components/UI/TheRange/TheRange";
import OurProducts from "@/components/UI/OurProducts/OurProducts";
import Rooms from "@/components/UI/Rooms/Rooms";
import Footer from "@/components/Views/Landing/Footer";
import Banner from "@/components/Views/Landing/Banner";

export default function HomePage() {
  return (
    <>
      <Banner />
      <TheRange />
      <OurProducts />
      <Rooms />
      <Footer />
    </>
  );
}
