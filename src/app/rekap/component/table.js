import React from 'react'

export default function table({data}) {
  return (
    <table className="table table-xs">
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
      </table>
  )
}
