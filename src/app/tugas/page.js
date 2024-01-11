"use client";
import React, { useState } from "react";
import axios from "axios";
import Table from "./component/table";
import Search from "./component/search";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Swal from "sweetalert";
const env = require("dotenv");
function Page() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = `http://103.229.14.238:3000/api/siswa?nama=${nama}`;

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };
  const handleClick = () => {
    if (nama.trim() != "") {
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
    if (nama) {
      // console.log(nama);
      const headers = {
        "x-barrier": "margaasih",
      };

      try {
        const response = await axios.get(apiUrl, { headers });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error :", error.message);
        Swal({
          icon: "warning",
          title: "Tidak ditemuka",
          text: `Data dengan nama ${nama} tidak ditemukan`,
        });
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <p className="px-3">Input Tugas</p>
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
