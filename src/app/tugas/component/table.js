import React, { useState } from "react";
import swal from "sweetalert";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";
export default function table({ data }) {
  const [loading, setLoading] = useState(false);
  var no = 1;
  const btnTugas = (item) => {
    swal("Nama Tugas:", {
      content: "input",
    }).then(async (tugas) => {
      setLoading(true);
      if (tugas) {
        await addDoc(collection(db, "tugas"), {
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.nama_rombel,
          tugas: tugas,
          tanggal: format(new Date(), "dd/MM/yyyy"),
        });
        swal(`data izin ${item.nama} tersimpan`, {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      
      <h1 className="font-bold text-2xl flex items-center justify-center m-3">
        Data dari Dapodik:
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <img src="/loading.svg" alt="My SVG Icon" />
        </div>
      ) : (
        <div className="hidden md:block">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>No</th>
                <th>NISN</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Kelas</th>
                <th>Agama</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{item.nisn}</td>
                  <td>{item.nama}</td>
                  <td>{item.jenis_kelamin}</td>
                  <td>{item.tanggal_lahir}</td>
                  <td>{item.nama_rombel}</td>
                  <td>{item.agama_id_str}</td>
                  <td>{item.alamat_jalan}</td>
                  <td>
                    <button
                      className="btn btn-primary mb-3 text-sm p-3"
                      name="tugas"
                      onClick={() => btnTugas(item)}
                    >
                      Mengerjakan Tugas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.map((item, index) => (
        <div className="flex items-center justify-center w-screen" key={index}>
          <div className="card w-96 bg-info shadow-xl mb-3 md:hidden">
            <div className="card-body">
              <h2 className="card-title">{item.nama}</h2>
              ___________________________________________
              <p>NISN: {item.nisn}</p>
              <p>Jenis Kelamin: {item.jenis_kelamin}</p>
              <p>Tanggal Lahir: {item.tanggal_lahir}</p>
              <p>Kelas: {item.nama_rombel}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  name="tugas"
                  onClick={() => btnTugas(item)}
                >
                  Mengerjakan Tugas
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
