"use client";

import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const {
        data: { token, message },
      } = await axios.post("http://localhost:9089/auth/sign-in", {
        username,
        password,
      });
      localStorage.setItem("token", token);
      toast.success("Daxil oldunuz!");
      router.push("/admin/products");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting the form."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#A1C287BD]">
      <div className="w-full max-w-md p-6 bg-green border-[2px] border-white rounded-lg shadow-lg">
        <LandingContainer>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center gap-4"
          >
            <div className="w-[209px] text-center text-white font-semibold size-[32px] leading-[48px]text-white">
              Admin Panel
            </div>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="underlined"
              required
              aria-label="Username"
              className="flex justify-center items-center w-full"
            />
            <Input
              placeholder="Parol"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="underlined"
              required
              aria-label="Password"
              className="flex justify-center items-center w-full"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Button
              type="submit"
              className="bg-[#34C759] text-white rounded-md py-3"
            >
              Daxil ol
            </Button>
          </form>
        </LandingContainer>
      </div>
    </div>
  );
};

export default AdminLogin;
