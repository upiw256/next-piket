"use client";
import Link from "next/link";
import React, { useState } from "react";
export default function menu() {
  const [currentPath, setCurrentPath] = useState("/");

  const active = (path) => {
    setCurrentPath(path);
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="bg-blue-400 w-screen h-14 flex md:hidden items-center justify-center text-2xl font-bold text-white">
        APK ABSEN
      </div>
      <div className="btm-nav flex z-[1] md:hidden">
        <Link
          href={"/"}
          className={
            currentPath === "/" ? "active bg-primary text-black" : "bg-blue-200"
          }
          onClick={() => active("/")}
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
            currentPath === "/rekap"
              ? "active bg-primary text-black"
              : "bg-blue-200"
          }
          onClick={() => active("/rekap")}
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
        <Link
          href={"/tugas"}
          className={
            currentPath === "/tugas"
              ? "active bg-primary text-black"
              : "bg-blue-200"
          }
          onClick={() => active("/tugas")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="btm-nav-label">Tugas</span>
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
            <li>
              <Link href={"/tugas"}>Rekap</Link>
            </li>
          </ul>
        </div>
      </div>
      
    </>
  );
}
