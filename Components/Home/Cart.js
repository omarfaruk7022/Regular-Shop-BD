import auth from "@/firebase.init";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

export default function Cart() {
  const [user] = useAuthState(auth);
  const email = user?.email;

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`https://easy-plum-caridea-tie.cyclic.app/api/cart/${email}`).then(
        (res) => res.json()
      ),
  });
  const refetch = () => {
    cartQuery.refetch();
  };
  const cartProducts = cartQuery.data?.data;

  useEffect(() => {
    if (!cartProducts) {
      refetch();
    }
  });
  const handleDelete = (id) => {
    fetch(`https://easy-plum-caridea-tie.cyclic.app/api/cart/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        swal("Deleted!", "Your Product has been deleted!", "success");
        refetch();
      }
    });
  };

  return (
    <>
      <div
        class="w-full max-w-sm   px-4 py-8 sm:px-6 lg:px-2"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
      >
        <div class="mt-4 space-y-6">
          <ul class="space-y-4">
            {cartProducts?.map((product) => (
              <>
                <li class="flex items-center gap-4">
                  <Image
                    src={product?.image}
                    width={50}
                    height={50}
                    alt=""
                    class="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 class="text-sm text-gray-900">{product?.name}</h3>

                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline">Price: </dt>
                        <dd class="inline">${product?.price}</dd>
                      </div>
                    </dl>
                  </div>

                  <div class="flex flex-1 items-center justify-end gap-2">
                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline">Quantity: </dt>
                        <dd class="inline">{product?.quantity}</dd>
                      </div>
                      <div>
                        <dt class="inline">Status: </dt>
                        <dd class="inline">
                          {
                            <span
                              class={`${
                                product?.orderStatus === "Pending" ||
                                product?.orderStatus === "Processing"
                                  ? "text-yellow-500"
                                  : product?.orderStatus === "Confirmed" ||
                                    product?.orderStatus === "Delivered"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              &#x25cf;
                            </span>
                          }{" "}
                          {product?.orderStatus}
                        </dd>
                      </div>
                    </dl>
                    {product?.orderStatus === "Pending" ||
                    product?.orderStatus === "Processing" ? (
                      <>
                        <button
                          onClick={() => {
                            handleDelete(product?._id);
                          }}
                          class="text-gray-600 transition hover:text-red-600"
                        >
                          <span class="sr-only">Remove item</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </>
                    ) : null}
                  </div>
                </li>
              </>
            ))}
          </ul>

          <div class="space-y-4 text-center">
            <Link
              href="/cartDetails"
              class="inline-flex p-3 items-center justify-center rounded-md bg-green-100 dark:bg-green-200  text-green-500 dark:text-green-600 hover:bg-green-200 hover:text-green-600 transition"
            >
              View my cart ({cartProducts?.length})
            </Link>

            <Link
              href={"/products"}
              class="block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
