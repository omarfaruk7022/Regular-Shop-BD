import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function productDetails() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);
  console.log(product);

  return (
    <div>
      <NavbarOther />
      <div className="flex justify-center">
        {product ? (
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <Image
                width={300}
                height={300}
                src={product?.data?.image}
                alt=""
              />
              <h1>{product?.data?.name}</h1>
              <h1>{product?.data?.price}</h1>
              <h1>{product?.data?.description}</h1>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}