import React from "react";
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
  var no = 1;
  const btnIzin = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk izin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (izin) => {
      if (izin) {
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
            kelas: item.nama_rombel,
            izin: 1,
            sakit: 0,
            alfa: 0,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data izin ${item.nama} tersimpan`, {
          icon: "success",
        });
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
      if (sakit) {
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
            kelas: item.nama_rombel,
            izin: 0,
            sakit: 1,
            alfa: 0,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data sakit ${item.nama} tersimpan`, {
          icon: "success",
        });
      }
    });
  };
  const btnAlfa = (item) => {
    swal({
      title: item.nama,
      text: "Apakah yakin untuk sakit",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
    }).then(async (alfa) => {
      if (alfa) {
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
            kelas: item.nama_rombel,
            izin: 0,
            sakit: 0,
            alfa: 1,
            tanggal: format(new Date(), "dd/MM/yyyy"),
          });
        }
        swal(`data sakit ${item.nama} tersimpan`, {
          icon: "success",
        });
      }
    });
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
      ))}
    </div>
  );
}
