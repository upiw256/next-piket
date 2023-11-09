"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

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
  const btnIzin = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk izin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then((willDelete) => {
      if (willDelete) {
        const dataAbsen = {
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.nama_rombel,
          ket: "izin",
        };
        localStorage.setItem('absenData', JSON.stringify(dataAbsen));
        const local = localStorage.getItem('absenData')
        const jsonData = JSON.parse(local)
        console.log(jsonData)
        localStorage.removeItem('absenData');
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
    <div className="h-screen w-full">
      <div className="flex justify-center items-center">
        <input
          type="text"
          value={nama}
          onChange={handleNamaChange}
          placeholder="Masukkan nama"
          className="mt-3 input input-bordered input-neutral w-full max-w-xs"
        />
      </div>
      <h1 className="ml-3">Data dari API:</h1>
      {nama ? (
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
                      <button className="btn btn-primary mb-3 w-24">
                        Izin
                      </button>
                      <button className="btn btn-warning mb-3 w-24">
                        Sakit
                      </button>
                      <button className="btn btn-error mb-3 w-24">Alfa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.map((item) => (
            <div className="card w-96 bg-info shadow-xl m-3">
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
      ) : (
        <p>Inputkan data..</p>
      )}
    </div>
  );
}

export default Page;
