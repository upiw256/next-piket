"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState([]);
  const [select, setSelect]=useState("")

  const handleSelect = (event) => {
    setSelect(event.target.value);
    console.log(select)
  };

  
  useEffect(() => {
    const fetchData = async () => {
      if(select){
        try {
          const q = query(
            collection(db, "item"),
            where("kelas", "==", select)
          );
          const querySnapshot = await getDocs(q);
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(dataArray)
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
      <select
        className="select select-bordered w-full max-w-xs mb-3"
        value={select}
        name="kelas"
        onChange={handleSelect}
      >
        <option value="10 - 1">X - 1</option>
        <option value="10 - 2">X - 2</option>
        <option value="10 - 3">X - 3</option>
        <option value="10 - 4">X - 4</option>
        <option value="10 - 5">X - 5</option>
        <option value="10 - 6">X - 6</option>
        <option value="10 - 7">X - 7</option>
        <option value="10 - 8">X - 8</option>
        <option value="10 - 9">X - 9</option>
        <option value="10 - 10">X - 10</option>
        <option value="10 - 11">X - 11</option>
        <option value="10 - 12">X - 12</option>
        <option value="11 IPA 1">XI IPA 1</option>
        <option value="11 IPA 2">XI IPA 2</option>
        <option value="11 IPA 3">XI IPA 3</option>
        <option value="11 IPA 4">XI IPA 4</option>
        <option value="11 IPA 5">XI IPA 5</option>
        <option value="11 IPA 6">XI IPA 6</option>
        <option value="11 IPS 1">XI IPS 1</option>
        <option value="11 IPS 2">XI IPS 2</option>
        <option value="11 IPS 3">XI IPS 3</option>
        <option value="11 IPS 4">XI IPS 4</option>
        <option value="11 IPS 5">XI IPS 5</option>
        <option value="11 IPS 6">XI IPS 6</option>
        <option value="12 IPA 1">XII IPA 1</option>
        <option value="12 IPA 2">XII IPA 2</option>
        <option value="12 IPA 3">XII IPA 3</option>
        <option value="12 IPA 4">XII IPA 4</option>
        <option value="12 IPA 5">XII IPA 5</option>
        <option value="12 IPA 6">XII IPA 6</option>
        <option value="12 IPS 1">XII IPS 1</option>
        <option value="12 IPS 2">XII IPS 2</option>
        <option value="12 IPS 3">XII IPS 3</option>
        <option value="12 IPS 4">XII IPS 4</option>
        <option value="12 IPS 5">XII IPS 5</option>
        <option value="12 IPS 6">XII IPS 6</option>
      </select>
      {select ? <table className="table table-xs">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NISN</th>
            <th>Kelas</th>
            <th>Izin</th>
            <th>Sakit</th>
            <th>Alfa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.nisn}</td>
              <td>{item.kelas}</td>
              <td>{item.izin}</td>
              <td>{item.sakit}</td>
              <td>{item.alfa}</td>
            </tr>
          ))}
        </tbody>
      </table> : <p>Pilih Kelas</p>}
    </div>
  );
}
