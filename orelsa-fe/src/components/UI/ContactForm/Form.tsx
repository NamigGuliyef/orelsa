"use client";

import { postContactUsGuest } from "@/api/admin";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Quality from "../Quality/Quality";

export const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const response = await postContactUsGuest({
      name,
      email,
      message,
      subject,
    });
    if (response) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
    setLoading(false);
  };

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <section>
      <LandingContainer>
        <form action="" className="w-full">
          <div className="w-full flex justify-center items-center md:items-start mt-20 gap-12 flex-col md:flex-row">
            {/* Contact Info Section */}
            <div className="w-[80%] md:w-[25%] m-auto md:m-0">
              <div className="flex gap-3 mb-8">
                <IoLocationSharp className="text-lg" />
                <div className="pt-2">
                  <h4 className="font-bold text-base">Ünvan</h4>
                  <p className="text-base font-normal">
                    236 5th SE Avenue, New York NY10000, United States
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mb-8">
                <FaPhoneAlt className="text-lg" />
                <div className="pt-2 w-[200px]">
                  <h4 className="font-bold text-base">Telefon</h4>
                  <p className="text-base font-normal">
                    Mobil: +(84) 546-6789 Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mb-8">
                <IoLocationSharp className="text-lg" />
                <div className="pt-2">
                  <h4 className="font-bold text-base">İş saatı</h4>
                  <p className="text-sm">
                    Bazar ertəsi-cümə: 9:00 - 22:00 Şənbə-Bazar: 9:00 - 21:00
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-[80%] md:w-[50%]">
              <div className="mb-8">
                <p className="mb-2 font-bold">Adınız</p>
                <Input
                  type="text"
                  isRequired
                  placeholder="Adınızı qeyd edin"
                  value={name}
                  onValueChange={setName}
                  variant="bordered"
                  size="lg"
                />
              </div>
              <div className="mb-8">
                <p className="mb-2 font-bold">Email</p>
                <Input
                  type="email"
                  isRequired
                  placeholder="Emailınızı qeyd edin"
                  value={email}
                  onValueChange={setEmail}
                  variant="bordered"
                  size="lg"
                />
              </div>
              <div className="mb-8">
                <p className="mb-2 font-bold">Mövzu</p>
                <Input
                  type="text"
                  placeholder="Vacib deyil"
                  value={message}
                  onValueChange={setMessage}
                  variant="bordered"
                  size="lg"
                />
              </div>
              <div className="mb-8 w-full">
                <Textarea
                  isRequired
                  label="Message"
                  labelPlacement="outside"
                  placeholder="Mesajınızı bura daxil edin."
                  className="max-w-md mb-2 font-bold"
                  value={subject}
                  onValueChange={setSubject}
                />
              </div>
              <div className="pb-10 pt-9">
                <Button
                  className="gap-3 bg-[#B88E2F] w-full sm:w-[222px] h-[75px] font-bold text-base text-white"
                  onClick={handleSubmit}
                >
                  {loading ? "Göndərilir" : "Göndər"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </LandingContainer>
      <Quality />
    </section>
  );
};
