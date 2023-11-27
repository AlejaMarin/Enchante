import React from 'react'
import Link from "next/link";

export default function signIn() {
    return (
        <>

            <Link
                href="/signin"
                className=" py-3 px-7 text-base lg:text-sm xl:text-lg font-bold text-white hover:text-body-color dark:text-yellow dark:hover:text-body-color  md:block"
            >
                Ingresar
            </Link>
            <Link
                href="/signup"
                className="ease-in-up rounded-md bg-white py-3 px-8 text-base font-bold text-primary transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 md:px-2 md:py-3 mx:py-3 xs:text-xs xl:text-lg sm:py-2 sm:px-2"
            >
                Registrarse
            </Link>
        </>

    )
}
