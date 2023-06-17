import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import swal from "sweetalert";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/Components/Common/Loading";

export default function Signup() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  let signInError;

  const handleSubmit =  (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.name.value;

    const userSignupData = {
      email,
      password,
      username,
    };

    if (error) {
      swal("Error", error.message, "error");
      return;
    } else { 
      fetch(`http://localhost:5000/api/users/email/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userSignupData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            createUserWithEmailAndPassword(email, password);
            swal("Yayy", "Sign Up Successfully Completed", "success");
            router.push("/");
          } else {
            swal("Error", "Sign Up Failed", "error");
          }
        });
    }
  };
  // if (loading) {
  //   return <Loading />;
  // }
 
  // if (user) {
  //   window.history.back();
  //   swal("Yayy", "Login Successfully Completed", "success");
  // }

  return (
    <div>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Get started today
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati sunt dolores deleniti inventore quaerat mollitia?
            </p>

            <form
              onSubmit={handleSubmit}
              action=""
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Sign Up to your account
              </p>

              <div>
                <label for="name" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    type="name"
                    name="name"
                    className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter name"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-500">
                You have Account ?
                <br />
                <Link className="underline" href={"/login"}>
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
