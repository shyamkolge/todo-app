import React from "react";
import { Link } from "react-router-dom";
import Login from "../Pages/Login";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
    const { auth } = useAuth();
    console.log(auth);
  return (
    <nav className="container">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="px-5 flex flex-wrap items-center">
          <div className="w-[35px]">
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-12.751 8.306c-.165-.147-.249-.351-.249-.556 0-.411.333-.746.748-.746.178 0 .355.062.499.19l2.371 2.011 4.453-4.962c.149-.161.35-.243.554-.243.417 0 .748.336.748.746 0 .179-.065.359-.196.503l-4.953 5.508c-.148.161-.35.243-.553.243-.177 0-.356-.063-.498-.19z"
                fill="white"
              />
            </svg>
          </div>
          <span className=" text-white text-3xl  font-semibold">TODO</span>
        </div>

        <div className="gap-5 flex justify-between items-center">
          <Link to={'/login'}>
          <button>Log In</button>
          </Link>

          <Link to={'/sign-up'}>
          <button className="bg-blue-400 px-3 py-1 rounded-full text-lg font-medium hover:bg-blue-600">
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
