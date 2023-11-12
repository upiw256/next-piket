"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Table from "../home/component/table";

export default function page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "item"));
        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataArray);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Table data={data} />
    </div>
  );
}
