import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  button?: () => React.ReactElement;
}

const AdminHeader = ({ title, button }: IProps) => {
  return (
    <div className="flex justify-between items-center w-full px-4 h-[70px]">
      <span className="text-2xl font-semibold">
        <Link className="text-[#34C759]" href="/">
          Orelsa.az
        </Link>
        / {title}
      </span>
      {button ? button() : null}
    </div>
  );
};

export default AdminHeader;
