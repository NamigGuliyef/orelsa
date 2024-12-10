import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { Input } from "@nextui-org/react";

const AdminDashboard = () => {
  return (
    <section>
      <LandingContainer>
        <div className="w-svw h-svh flex items-center justify-center">
          <div className="shadow-2xl border-2 border-white-500/100 relative p-14 lg:w-[50%] mx-auto">
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="email" variant={"underlined"} label="User Name" />
              </div>

              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="password"
                  variant={"underlined"}
                  label="Password"
                />
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default AdminDashboard;
