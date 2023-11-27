"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import SignIn from "./signIn";
import SignOut from "./signOut";
import Admin from "../Admin/admin";
import { UserContext } from "@/app/providers";
import { useContext } from "react";
import { decoded } from "@/app/helper/global";

const Header = () => {
  // Navbar toggle
  let { user, setUser } = useContext(UserContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    const userSessionStorage = sessionStorage.getItem("token");
    if (userSessionStorage) {
      const profile = decoded(userSessionStorage);
      setUser(profile);
    }
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <header
        className={`header z-40 flex w-full items-center ${
          sticky
            ? "fixed top-0 !z-[9999] shadow-sticky backdrop-blur-sm transition"
            : "absolute"
        }`}
        style={{
          ...(sticky && {
            backgroundImage:
              "linear-gradient(100deg, rgba(0,18,33,1) 0%, rgba(13,38,59,0.8715861344537815) 32%, rgba(13,38,59,0.4206057422969187) 50%, rgba(13,38,59,0.8491771708683473) 73%, rgba(6,26,43,1) 99%)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }),
        }}
      >
        <div className="container">
          <div className="relative flex justify-between ">
            <div className="xl:w-60 md:w-40 sm:w-1/4 xs:w-1/5">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={80}
                  height={20}
                  className="w-3/5 sm:hidden"
                />
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full sm:block"
                />
              </Link>
            </div>
            <div className="flex xs:w-5/6 w-full md:mx-5 sm:mx-0 xs:mx-0 items-center md:items-left justify-between xl:ml-8 sm:ml-0 xs:ml-0">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 sm:px-0 lg:hidden"
                  
                >
                  <span
                    className={`relative my-1.5 block h-0.5 md:w-[30px] sm:w-[20px] bg-black bg-white transition-all duration-300 ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 md:w-[30px] sm:w-[20px] bg-black bg-white transition-all duration-300 ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 md:w-[30px] sm:w-[20px] bg-black bg-white transition-all duration-300 ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute top-21 right-4 z-30 w-[250px] rounded border-none bg-primary/90 px-8 py-4 font-bold text-white duration-300 lg:visible lg:static lg:w-auto lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-3">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`text-bold flex py-2 hover:text-black hover:text-body-color group-hover:font-extrabold dark:text-yellow dark:hover:text-body-color lg:mr-0 lg:inline-flex lg:px-0 lg:py-0 xl:ml-6 lg:pl-2 lg:text-sm xl:text-lg`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex  lg:px-0"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                            <div
                              className={`submenu relative left-0 top-full rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem) => (
                                <Link
                                  href={submenuItem.path}
                                  key={submenuItem.id}
                                  className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between md:px-4 sm:px-0 xs:px-0">
                  {!user ? (
                    <SignIn />
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        className="py-3 xl:mx-6 lg:mx-5 sm:mx-2 font-bold xs:font-medium text-white hover:text-black dark:text-yellow dark:hover:text-body-color md:block md:p-2 lg:m-0 lg:p-0 lg:py-0 lg:text-sm xl:text-lg md:text-sm sm:text-sm xs:text-xs xs:mx-1"
                      >
                        Mi Perfil
                      </Link>

                      {user.role === "ROLE_ADMIN" && (
                        <Link
                          href="/Admin"
                          className="py-3 mr-6 sm:mr-2 font-bold xs:font-medium text-white hover:text-black dark:text-yellow dark:hover:text-body-color md:block md:p-2 lg:text-sm xl:text-lg md:text-sm sm:text-sm xs:text-xs sm:p-0 sm:mr-0 xs:mx-0 "
                        >
                          Admin
                        </Link>
                      )}
                      <SignOut currentUser={user} />
                    </>
                  )}
                </div>

                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
