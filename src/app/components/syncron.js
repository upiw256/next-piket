"use client";
import axios from "axios";
import React, { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

async function clearCollection(collectionPath) {
  const querySnapshot = await getDocs(collection(db, collectionPath));

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}
export default function syncron() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const syncronizeData = async () => {
    const apiUrl = "http://103.229.14.238:3000/api/siswa";
    const headers = {
      "x-barrier": "margaasih",
    };

    setIsLoading(true); // Set loading state to true

    try {
      clearCollection("siswa");
      const response = await axios.get(apiUrl, { headers });
      const data = response.data.rows;

      for (const item of data) {
        const { peserta_didik_id, nisn, nama, nama_rombel, alamat_jalan } =
          item;
        await addDoc(collection(db, "siswa"), {
          id_siswa: peserta_didik_id,
          nisn,
          nama,
          kelas: nama_rombel,
          alamat: alamat_jalan,
        });
      }

      setIsLoading(false); // Set loading state to false after API call is complete
    } catch (error) {
      setIsLoading(false); // Set loading state to false on error
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Display loading state if isLoading is true
      ) : (
        <button className="btn btn-primary mx-3" onClick={syncronizeData}>
          Syncron
        </button>
      )}
    </div>
  );
}
