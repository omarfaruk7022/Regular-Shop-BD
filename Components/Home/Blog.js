import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../Common/Loading";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });



  return (
    <div>
      <section>
        <div class=" px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header class="text-center">
            <h4 className="text-3xl text-center pt-10">
              Our Fashion <span className="text-green-500">Collections</span>
            </h4>

            <p class="max-w-md mx-auto mt-4 text-gray-500">
              We have worlds best cotton and woolen clothes for you. We have all
              the latest fashion collection for you.
            </p>
          </header>

          <ul class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-4">
            {isLoading ? (
              <h1>
                <Loading />
              </h1>
            ) : error ? (
              <h1>{error}</h1>
            ) : (
              data?.data
                .filter((product) => product.category === "Dress")
                ?.slice(0, 8)
                .map((product) => (
                  <>
                    <Link href={`/products/${product._id}`}>
                      <li>
                        <a href="#" class="relative block group">
                          <Image
                            src={product.image}
                            width={350}
                            height={350}
                            alt=""
                            class="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                          />

                          <div class="absolute inset-0 flex flex-col items-start justify-end p-6">
                            <h3 class="text-xl font-medium text-white">
                              Casual Trainers
                            </h3>

                            <span class="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                              Shop Now
                            </span>
                          </div>
                        </a>
                      </li>
                    </Link>
                  </>
                ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
