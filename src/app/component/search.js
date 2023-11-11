import React from 'react'

export default function search({nama, handleNamaChange}) {
  return (
    <>
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
    </>
  )
}
