
"use client"

import { useAuth } from "@/shared/hocs/AuthProvider";
import { Menu, MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  //   const { data: session } = useSession();
  const { login, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      router.replace(`/search?name=${e.target.value}`);
    }
  }

  //   bg-[#141414]
  return (
    <header
      className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <p className="font-bold text-3xl text-white">
          <span className="text-yellow-500 font-bold">MOVIZIUS</span>
        </p>
        <ul className="hidden md:space-x-4 md:flex cursor-pointer items-center ">
          <li
            className={`navBarComponents ${
              pathname === "/" && "bg-yellow-500 px-2.5 py-2.5 rounded-md "
            }`}
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/tv" && "bg-yellow-500 px-2.5 py-2.5 rounded-md text-black"
            }`}
            onClick={() => router.push("/tv")}
          >
            TV Shows
          </li>
          <li className="navBarComponents" onClick={() => router.push("/")}>
            Movies
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/people" && "bg-yellow-500 px-2.5 py-2.5 rounded-md text-black"
            }`}
            onClick={() => router.push("/people")}
          >
            People
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/search" && "bg-yellow-500 px-2.5 py-2.5 rounded-md text-black"
            }`}
            onClick={() => router.push("/search")}
          >
            Search
          </li>
          {isAuthenticated && (
            <li
              className={`navBarComponents ${
                pathname === "/profile" && "bg-yellow-500 px-2.5 py-2.5 rounded-md text-black"
              }`}
              onClick={() => router.push("/profile")}
            >
              Profile
            </li>
          )}
        </ul>
      </div>
      <div className="relative flex items-center mx-8 w-[40%] h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          onKeyUp={handleKeyUp}
          placeholder="Search something.." />
      </div>
      <div className="font-light flex items-center space-x-4 text-sm mr-8">
        {isAuthenticated ? (
          <div>
            <button
              className="bg-yellow-500 text-black px-2.5 py-2.5 rounded-md text-sm font-medium"
              onClick={() => logout()}
            >
            Sign Out
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push("/profile")}>
                My account
              </MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <button
            className="bg-yellow-500 px-2.5 py-2.5 rounded-md text-sm font-medium"
            onClick={() => login()}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;