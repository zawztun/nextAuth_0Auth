import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const lists = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "blog",
    url: "/Blog",
  },
];

type Props = {};

const NavBar = (props: Props) => {
  const { data, status } = useSession();

  return (
    <div className="flex justify-between w-full mx-auto border-b-4 p-8">
      <div> NextAuth </div>
      <div className="felx ">
        <div className="flex gap-4 ">
          {lists.map((list) => (
            <Link key={list.name} href={`${list.url}`} className="uppercase">
              {list.name}
            </Link>
          ))}

          {status === "authenticated" && (
            <Link href="/Dashboard">Dashboard</Link>
          )}

          {!data && status === "unauthenticated" && (
            <Link
              href="api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </Link>
          )}

          {status === "authenticated" && (
            <Link
              href="api/auth/singout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
