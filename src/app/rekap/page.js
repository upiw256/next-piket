"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import SelectKelas from "./component/select";
import TableRekap from "./component/table";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function page() {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("");

  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (select) {
        try {
          const q = query(collection(db, "item"), where("kelas", "==", select));
          const querySnapshot = await getDocs(q);
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(dataArray);
        } catch (error) {
          console.error("Error fetching data from Firestore:", error);
        }
      }
    };
    fetchData();
  }, [select]);
  return (
    <div className="m-3">
      <SelectKelas select={select} handleSelect={handleSelect} />
      {select ? <TableRekap data={data} /> : <p>Pilih Kelas</p>}
      <ScrollToTopButton />
    </div>
  );
}
