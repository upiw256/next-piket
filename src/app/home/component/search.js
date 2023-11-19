import React from "react";

export default function search({ nama, handleNamaChange, handleClick }) {
  return (
    <>
      <div className="flex justify-center items-center mt-3">
        <input
          type="text"
          value={nama}
          onChange={handleNamaChange}
          placeholder="Masukkan nama"
          className=" input input-bordered input-neutral w-full max-w-xs"
        />
        <button className="btn btn-primary ml-3" onClick={handleClick}>Cari</button>
      </div>
      
    </>
  );
}
