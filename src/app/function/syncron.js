"use client";
import axios from "axios";
import React, { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

async function clearCollection(collectionPath) {
  const querySnapshot = await getDocs(collection(db, collectionPath));

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}
export default function syncron() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const syncronizeData = async () => {
    const apiUrl = process.env.LINK_API + "siswa";
    const headers = {
      "x-barrier": process.env.HEADER_API,
    };

    setIsLoading(true); // Set loading state to true

    try {
      // clearCollection("siswa");
      const response = await axios.get(apiUrl, { headers });
      const data = response.data.rows;
      const totalData = data.length;
      let loadedData = 0;
      clearCollection("siswa");
      for (const item of data) {
        const {
          peserta_didik_id,
          nisn,
          nama,
          nama_rombel,
          alamat_jalan,
          jenis_kelamin,
          tanggal_lahir,
          agama_id_str,
        } = item;
        const q = query(
          collection(db, "siswa"),
          where("id_siswa", "==", peserta_didik_id)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size);
        if (querySnapshot.size == 0) {
          await addDoc(collection(db, "siswa"), {
            id_siswa: peserta_didik_id,
            nisn,
            jenis_kelamin,
            agama: agama_id_str,
            tanggal_lahir,
            nama: nama.toLowerCase(),
            kelas: nama_rombel,
            alamat: alamat_jalan,
          });
        }
        loadedData++;
        const percentage = Math.floor((loadedData / totalData) * 100);
        setLoadingPercentage(percentage);
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
        <div className="w-full h-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${loadingPercentage}%` }}
          ></div>
        </div> // Display loading state if isLoading is true
      ) : (
        <button className="btn btn-primary mx-3" onClick={syncronizeData}>
          Syncron
        </button>
      )}
    </div>
  );
}
