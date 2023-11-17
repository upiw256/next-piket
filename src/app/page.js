"use client";
import React, { useState } from "react";
import axios from "axios";
import Table from "./home/component/table";
import Search from "./home/component/search";
import Swal from "sweetalert";
const env = require("dotenv");
function Page() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
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
    }
  };

  const fetchData = async () => {
    if (nama) {
      console.log(nama);
      const headers = {
        "x-barrier": "margaasih",
      };

      try {
        const response = await axios.get(apiUrl, { headers });
        setData(response.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <div className="h-screen w-full">
      <Search
        nama={nama}
        handleNamaChange={handleNamaChange}
        handleClick={handleClick}
      />
      {nama ? <Table data={data} /> : <p>Inputkan data..</p>}
    </div>
  );
}

export default Page;
