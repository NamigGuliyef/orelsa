import { Form } from "@/components/UI/ContactForm/Form";
import { FormTitle } from "@/components/UI/ContactForm/FormTitle";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <section className="bg-contact flex items-center justify-center min-h-[300px] w-full bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col justify-center items-center -mt-10 w-full h-full">
          <Image
            src="/Contact/Logos-05.svg"
            alt="Logo"
            width={77}
            height={77}
            className="bg-no-repeat bg-center bg-cover"
          />

          <p className="text-5xl font-medium">Bizimlə əlaqə</p>

          <div className="flex justify-center items-center gap-3">
            <Link href="/" className="text-base font-bold p-3">
              Ana səhifə
            </Link>

            <span className="font-bold">&gt;</span>

            <Link href="/shop" className="text-base font-medium">
              Bizimlə əlaqə
            </Link>
          </div>
        </div>
      </section>

      <FormTitle />
      <Form />
    </>
  );
}
