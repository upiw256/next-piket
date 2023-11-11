import React from "react";
import swal from "sweetalert";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase'
export default function table({ data, no }) {
  const btnIzin = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk izin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (willDelete) => {
      if (willDelete) {
          await addDoc(collection(db,'item'),{
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.nama_rombel,
          ket: "izin",
          })
        swal(`data izin ${item.nama} tersimpan`, {
          icon: "success",
        });
      }
    });
  };

  const btnSakit = () => {
    alert("Button Sakit");
  };

  return (
    <div className="overflow-x-auto ">
      <div className="hidden md:block">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>No</th>
              <th>NISN</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Lahir</th>
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
                <td>{item.agama_id_str}</td>
                <td>{item.alamat_jalan}</td>
                <td>
                  <button className="btn btn-primary mb-3 w-24">Izin</button>
                  <button className="btn btn-warning mb-3 w-24">Sakit</button>
                  <button className="btn btn-error mb-3 w-24">Alfa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.map((item) => (
        <div className="card w-96 bg-info shadow-xl m-3 block md:hidden">
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
                name="izin"
                onClick={() => btnIzin(item)}
              >
                Izin
              </button>
              <button
                className="btn btn-warning"
                name="sakit"
                onClick={btnSakit}
              >
                Sakit
              </button>
              <button className="btn btn-error" name="alfa">
                Alfa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
