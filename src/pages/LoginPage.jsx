import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLogin } from "../state";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [submitting, setSubmitting] = useState("Submit");
  const URL = isRegister
    ? "https://ecomtestserver.onrender.com/auth/register"
    : "https://ecomtestserver.onrender.com/auth/login";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setSubmitting("Submitting...");

    try {
      const response = await axios.post(URL, { email, password });
      console.log(response);
      if (isRegister) {
        if (password != e.target[2].value)
          return alert("Passwords do not match");
        alert("Success, login to your account!");
        e.target[1].value = "";
        setIsRegister(false);
        setSubmitting("Submit");
      } else {
        const user = response?.data?.user;
        const token = response?.data?.token;
        dispatch(setLogin({ user: user, token: token }));
        navigate("/");
      }
    } catch (error) {
      setSubmitting("Submit");
      return alert(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex z-50 min-h-full flex-1 font-semibold flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10  text-center text-2xl font-bold leading-9 tracking-tight text-black">
            {isRegister ? "Register" : "Login to"} your account here
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm  leading-6 text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm  leading-6 text-black"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className={`${
                      isRegister && "hidden"
                    } font-semibold text-indigo-600 hover:text-indigo-500`}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {isRegister && "Confirm Password"}
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  className={`${
                    !isRegister
                      ? "hidden"
                      : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  } block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {submitting}
              </button>
              <div className="mt-2">
                <label className="pr-5" htmlFor="">
                  {isRegister ? "" : "Don't"} have an account?
                </label>
                <label
                  className="hover:underline text-blue-700 cursor-pointer"
                  onClick={() => setIsRegister(!isRegister)}
                  htmlFor=""
                >
                  {isRegister ? "Login" : "Register"}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
