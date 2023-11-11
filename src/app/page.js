"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./component/table";
import Search from "./component/search";
const env = require("dotenv");
function Page() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  var no = 1;

  const apiUrl = `http://103.229.14.238:3000/api/siswa?nama=${nama}`;

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const fetchData = async () => {
    if (nama) {
      const headers = {
        "x-barrier": "margaasih",
      };

      try {
        const response = await axios.get(apiUrl, { headers });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [nama]);

  return (
    <div className="h-screen w-full">
      <Search nama={nama} handleNamaChange={handleNamaChange} />
      {nama ? <Table data={data} no={no} /> : <p>Inputkan data..</p>}
    </div>
  );
}

export default Page;
