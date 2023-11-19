"use client";
import Link from "next/link";
import React, { useState } from "react";
export default function menu() {
  const [areButtonsActive, setAreButtonsActive] = useState({
    button1: true,
    button2: false,
  });

  const handleClickButton1 = () => {
    setAreButtonsActive((prevState) => ({
      ...prevState,
      button1: !prevState.button1,
      button2: false,
    }));
  };

  const handleClickButton2 = () => {
    setAreButtonsActive((prevState) => ({
      ...prevState,
      button1: false,
      button2: !prevState.button2,
    }));
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="btm-nav flex md:hidden">
        <Link
          href={"/"}
          className={
            areButtonsActive.button1
              ? "active bg-primary text-gray-400"
              : "bg-blue-200"
          }
          onClick={handleClickButton1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label">Home</span>
        </Link>
        <Link
          href={"/rekap"}
          className={
            areButtonsActive.button2
              ? "active bg-primary text-gray-400"
              : "bg-blue-200"
          }
          onClick={handleClickButton2}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">Rekap</span>
        </Link>
      </div>
      {/* Web Menu */}
      <div className="navbar bg-blue-400 text-white hidden md:flex">
        <div className="navbar-start">
          <Link href={"/"} className="font-bold text-3xl">
            APK ABSENSI
          </Link>
        </div>
        <div className="navbar-end flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/rekap"}>Rekap</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
