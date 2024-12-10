import LandingContainer from "@/components/Views/Landing/LandingContainer";

export const FormTitle = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <LandingContainer>
          <section className="">
            <div className="mt-24 w-full flex  items-center flex-col gap-2">
              <h1 className="font-semibold text-4xl">Bizimlə Əlaqə Saxlayın</h1>
              <p className="text-base font-normal text-center">
              "Məhsul və xidmətlərimiz haqqında daha ətraflı məlumat üçün bizə e-poçt göndərə bilərsiniz.
               <br /> Komandamız sizə kömək etmək üçün həmişə hazırdır. Çəkinmədən bizimlə əlaqə saxlayın!"              
              </p>
            </div>
          </section>
        </LandingContainer>
      </div>
    </>
  );
};
