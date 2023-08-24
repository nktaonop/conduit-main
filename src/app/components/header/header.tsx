"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState(null);

  const handleButtonClick = (linkIndex: any) => {
    setActiveLink(linkIndex);
  };

  return (
    <div className="w-[100%] py-[0.5rem]">
      <div className="flex justify-between items-center max-w-[1110px] mx-auto">
        <Link className="text-primary text-[24px] font-bold" href="/">
          conduit
        </Link>
        <div>
          <Link
            href="/"
            className={`link ${
              activeLink === 0 ? "text-clicked" : "text-unClicked"
            }`}
            onClick={() => {
              handleButtonClick(0);
            }}>
            Home
          </Link>
          <Link
            href="/signin"
            className={`ml-4 link ${
              activeLink === 1 ? "text-clicked" : "text-unClicked"
            }`}
            onClick={() => {
              handleButtonClick(1);
            }}>
            Sign in
          </Link>
          <Link
            href="/signup"
            className={`ml-4 link ${
              activeLink === 2 ? "text-clicked" : "text-unClicked"
            }`}
            onClick={() => {
              handleButtonClick(2);
            }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
