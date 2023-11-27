"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/providers";
import { useContext } from "react";

export default function SignOut({ currentUser }) {
  const router = useRouter();

  let { user, setUser } = useContext(UserContext);
  const removeUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.push("/");
    setUser(null);
  };
  return (
    <>
      <p className="mr-2 p-4 py-3 md:py-3 lg:py-3 md:text-xs xs:text-xs text-base italic font-black uppercase text-primary rounded bg-[#fff]/20 dark:text-body-color dark:text-yellow md:mr-0 md:p-4 sm:p-2 sm:mr-0 xs:mr-0 xs:p-0 xs:py-2 xs:mx-1 lg:hidden">
        ¡Hola {user.name}!
      </p>
      <p className="hidden p-4 py-3 lg:py-3 xl:py-2 lg:text-xs xl:text-base italic font-black uppercase text-primary rounded bg-[#fff]/20 dark:text-body-color dark:text-white lg:block">
        ¡Hola {user.name} {user.lastName}!
      </p>
    
      <div className="mx-9 md:mx-2 lg:mx-4 sm:mx-2 xs:mx-2">
        <button
          onClick={removeUser}
          className="mx-2 flex w-full items-center justify-center rounded-md bg-white px-6 xl:py-2 lg:py-3 xl:text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp md:px-2 md:py-3 mx:py-3 xs:text-xs sm:py-2 sm:px-0 xs:py-2 xs:px-0 xs:mx-1"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
