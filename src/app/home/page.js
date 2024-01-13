"use client";
import React, { useState } from "react";
import Table from "./component/table";
import Search from "./component/search";
import ScrollToTopButton from "../function/ScrollToTopButton";
import Syncron from "../function/syncron";
import Swal from "sweetalert";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";

function Page() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNamaChange = (event) => {
    setNama(event.target.value); // capitalizeFirstLetter(event.target.value);
  };
  function capitalizeFirstLetter(inputString) {
    // Check if the input is a non-empty string
    if (typeof inputString !== "string" || inputString.length === 0) {
      return inputString;
    }

    // Capitalize the first letter and concatenate the rest of the string
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  const handleClick = () => {
    if (nama.trim() !== "") {
      fetchData();
    } else {
      Swal({
        icon: "warning",
        title: "Harap isi nama",
        text: "Nama tidak boleh kosong",
      });
      setData([]);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "siswa"),
        orderBy("nama"),
        startAt(nama),
        endAt(nama + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const siswa = querySnapshot.docs.map((doc) => doc.data());
      setData(siswa);
      console.log(siswa);
      setLoading(false);
    } catch (error) {
      console.error("Error :", error.message);
      Swal({
        icon: "warning",
        title: "Tidak ditemuka",
        text: `Data dengan nama ${nama} tidak ditemukan`,
      });
    }
  };
  return (
    <div>
      <p className="px-3">Input Absen</p>
      <Syncron />
      <Search
        nama={nama}
        handleNamaChange={handleNamaChange}
        handleClick={handleClick}
      />
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <img src="/loading.svg" alt="My SVG Icon" />
        </div>
      ) : (
        <Table data={data} />
      )}
      <ScrollToTopButton />
    </div>
  );
}

export default Page;
