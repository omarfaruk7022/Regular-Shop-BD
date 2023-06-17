import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import swal from "sweetalert";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let signInError;

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;
    if (!password || !email) {
      swal("Oops", "Email or Password Must Not Be Empty", "error");
      return;
    } else if (password.length < 6) {
      swal("Oops", "Password Must Be 6 Characters", "error");
      return;
    }
    if (!email.includes("@")) {
      swal("Oops", "Email Must Be Valid", "error");
      return;
    } else {
      signInWithEmailAndPassword(email, password);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (error) {
    swal("Oops", "Email or Password May Incorrect", "error");
    return;
  } else if (user) {
    window.history.back();
    swal("Yayy", "Login Successfully Completed", "success");
  }
  if (loading) {
    <Loading />;
    return;
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
            onSubmit={handleSubmit}
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            {signInError}
            <div>
              <label for="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label for="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div>
              <input
                type="submit"
                value="Sign in"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-indigo-700"
              />
            </div>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link href={"/signup"} className="underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
