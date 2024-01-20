"use client";

import { httpClient } from "@/app/providers/http.provider";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState, useEffect } from "react";
import { UserInterface } from "../interfaces/user.interface";

export default function Header() {
  const [user, setUser] = useState<null | UserInterface>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { user },
      } = await httpClient.get("/user");
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Home", path: "/", targetSegment: null },
    { label: "Sign in", path: "/signin", targetSegment: "signin" },
    { label: "Sign up", path: "/signup", targetSegment: "signup" },
  ];

  const userLinks = [
    { label: "Home", path: "/", targetSegment: null },
    {
      label: "New Article",
      path: "/new-article",
      targetSegment: "new-article",
    },
    { label: "Settings", path: "/settings", targetSegment: "settings" },
  ];

  return (
    <div className="w-[100%] py-[0.5rem]">
      <div className="flex justify-between items-center max-w-[1110px] mx-auto">
        <Link className="text-primary text-[24px] font-bold" href="/">
          conduit
        </Link>

        {user ? (
          <div>
            {userLinks.map((l, i) => (
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
            <Link
              className={`mr-4 link ${
                activeSegment === "profile" ? "text-clicked" : "text-unClicked"
              }`}
              href={`/profile/${user.username}`}>
              {user.username}
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
