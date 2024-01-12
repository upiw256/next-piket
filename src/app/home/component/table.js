import React, { useState } from "react";
import swal from "sweetalert";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";
export default function table({ data }) {
  const [loading, setLoading] = useState(false);
  var no = 1;
  const formatDate = (inputDate) => {
    const dateArray = inputDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    // Format tanggal dalam format "dd-mm-yyyy"
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  const kelamin = (item) => {
    return item === "L" ? "Laki-laki" : "Perempuan";
  };
  const btnIzin = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk izin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (izin) => {
      setLoading(true);
      if (izin) {
        await addDoc(collection(db, "absen"), {
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.kelas,
          Ket: "Izin",
          tanggal: format(new Date(), "dd/MM/yyyy"),
        });
        const q = query(
          collection(db, "item"),
          where("id_siswa", "==", item.peserta_didik_id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            izin: querySnapshot.docs[0].data().izin + 1,
          });
        } else {
          await addDoc(collection(db, "item"), {
            id_siswa: item.peserta_didik_id,
            nisn: item.nisn,
            nama: item.nama,
            kelas: item.kelas,
            izin: 1,
            sakit: 0,
            alfa: 0,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data izin ${item.nama} tersimpan`, {
          icon: "success",
        });
        setLoading(false);
      }
    });
  };
  const btnSakit = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk sakit",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (sakit) => {
      setLoading(true);
      if (sakit) {
        await addDoc(collection(db, "absen"), {
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.kelas,
          Ket: "Sakit",
          tanggal: format(new Date(), "dd/MM/yyyy"),
        });
        const q = query(
          collection(db, "item"),
          where("id_siswa", "==", item.peserta_didik_id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            sakit: querySnapshot.docs[0].data().sakit + 1,
          });
        } else {
          await addDoc(collection(db, "item"), {
            id_siswa: item.peserta_didik_id,
            nisn: item.nisn,
            nama: item.nama,
            kelas: item.kelas,
            izin: 0,
            sakit: 1,
            alfa: 0,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data sakit ${item.nama} tersimpan`, {
          icon: "success",
        });
        setLoading(false);
      }
    });
  };
  const btnAlfa = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk alfa",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (alfa) => {
      setLoading(true);
      if (alfa) {
        await addDoc(collection(db, "absen"), {
          id_siswa: item.peserta_didik_id,
          nisn: item.nisn,
          nama: item.nama,
          kelas: item.kelas,
          Ket: "Alfa",
          tanggal: format(new Date(), "dd/MM/yyyy"),
        });
        const q = query(
          collection(db, "item"),
          where("id_siswa", "==", item.peserta_didik_id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            alfa: querySnapshot.docs[0].data().alfa + 1,
          });
        } else {
          await addDoc(collection(db, "item"), {
            id_siswa: item.peserta_didik_id,
            nisn: item.nisn,
            nama: item.nama,
            kelas: item.kelas,
            izin: 0,
            sakit: 0,
            alfa: 1,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data sakit ${item.nama} tersimpan`, {
          icon: "success",
        });
        setLoading(false);
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
                  <td>{kelamin(item.jenis_kelamin)}</td>
                  <td>{formatDate(item.tanggal_lahir)}</td>
                  <td>{item.kelas}</td>
                  <td>{item.agama}</td>
                  <td>{item.alamat}</td>
                  <td>
                    <button
                      className="btn btn-primary mb-3 w-24"
                      name="izin"
                      onClick={() => btnIzin(item)}
                    >
                      Izin
                    </button>
                    <button
                      className="btn btn-warning mb-3 w-24"
                      name="sakit"
                      onClick={() => btnSakit(item)}
                    >
                      Sakit
                    </button>
                    <button
                      className="btn btn-error mb-3 w-24"
                      name="alfa"
                      onClick={() => btnAlfa(item)}
                    >
                      Alfa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.map((item, index) => (
        <div className="flex items-center justify-center w-screen">
          <div
            className="card w-96 bg-info shadow-xl mb-3 md:hidden"
            key={index}
          >
            <div className="card-body">
              <h2 className="card-title">{item.nama}</h2>
              ___________________________________________
              <p>NISN: {item.nisn}</p>
              <p>Jenis Kelamin: {kelamin(item.jenis_kelamin)}</p>
              <p>Tanggal Lahir: {formatDate(item.tanggal_lahir)}</p>
              <p>Kelas: {item.kelas}</p>
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
                  onClick={() => btnSakit(item)}
                >
                  Sakit
                </button>
                <button
                  className="btn btn-error"
                  name="alfa"
                  onClick={() => btnAlfa(item)}
                >
                  Alfa
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
