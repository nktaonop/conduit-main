"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Home", path: "/", targetSegment: null },
    { label: "Sign in", path: "/signin", targetSegment: "signin" },
    { label: "Sign up", path: "/signup", targetSegment: "signup" },
  ];

  return (
    <div className="w-[100%] py-[0.5rem]">
      <div className="flex justify-between items-center max-w-[1110px] mx-auto">
        <Link className="text-primary text-[24px] font-bold" href="/">
          conduit
        </Link>
        <div>
          {links.map((l, i) => (
            <Link
              className={`mr-4 link ${
                activeSegment == l.targetSegment
                  ? "text-clicked"
                  : "text-unClicked"
              }`}
              key={i}
              href={l.path}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
