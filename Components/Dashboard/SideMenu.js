import React, { useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Loading from "../Common/Loading";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { MdLibraryAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { HiOutlineLogout, HiShoppingBag } from "react-icons/hi";

export default function SideMenu() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const email = user?.email;

  const handleSignOut = () => {
    signOut(auth);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://easy-plum-caridea-tie.cyclic.app/api/users/email/${email}`
      ).then((res) => res.json()),
  });
  return (
    <div className="hidden lg:block shadow-2xl px-6  w-[220px] ">
      <div className="flex h-screen flex-col justify-between ">
        <div className=" py-6 ">
          <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1 ">
            <Link
              href="/dashboard/"
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
            >
              <MdSpaceDashboard className="text-[20px]" />
              <span className="text-sm font-medium"> Dashboard </span>
            </Link>

            {data?.data[0]?.role === "admin" && (
              <>
                <Link
                  href="/dashboard/addProduct"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <MdLibraryAdd className="text-[20px]" />
                  <span className="text-sm font-medium"> Add Product </span>
                </Link>

                <Link
                  href="/dashboard/manageProduct"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <IoSettings className="text-[20px]" />
                  <span className="text-sm font-medium"> Manage Product </span>
                </Link>
                <Link
                  href="/dashboard/allUsers"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <FaUsers className="text-[20px]" />
                  <span className="text-sm font-medium"> All Users </span>
                </Link>
                <Link
                  href="/dashboard/allOrders"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <HiShoppingBag className="text-[20px]" />
                  <span className="text-sm font-medium"> All Orders </span>
                </Link>
              </>
            )}

            <Link
              href="/dashboard/myProfile"
              className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
            >
              <RiAccountPinCircleFill className="text-[20px]" />
              <span className="text-sm font-medium"> My Profile </span>
            </Link>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2  text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black ">
                <div className="flex items-center gap-2">
                  <MdManageAccounts className="text-[20px]" />
                  <span className="text-sm font-medium"> Account </span>
                </div>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <nav aria-label="Account Nav" className="mt-2 flex flex-col px-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-4 py-2  text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <MdSecurity className="text-[20px]" />
                  <span className="text-sm font-medium"> Security </span>
                </Link>

                <button
                  onClick={handleSignOut}
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <HiOutlineLogout className="text-[20px]" />

                  <span className="text-sm font-medium"> Logout </span>
                </button>
              </nav>
            </details>
          </nav>
        </div>

        <div className="sticky inset-x-0 bottom-0 ">
          <Link href="/" className="flex items-center gap-2 py-3">
            <Image
              alt="Man"
              width={40}
              height={40}
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-8 w-8 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {data?.data[0]?.username}
                </strong>

                <span>
                  {data?.data[0]?.role === "admin" ? (
                    <>
                      <p className="text-red-500 font-bold">Admin</p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-500 ">Normal User</p>
                    </>
                  )}
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
