import React from 'react'

export default function select( {select, handleSelect}) {
  return (
    <select
        className="select select-bordered w-full max-w-xs mb-3"
        value={select}
        name="kelas"
        onChange={handleSelect}
      >
        <option value="10 - 1">X - 1</option>
        <option value="10 - 2">X - 2</option>
        <option value="10 - 3">X - 3</option>
        <option value="10 - 4">X - 4</option>
        <option value="10 - 5">X - 5</option>
        <option value="10 - 6">X - 6</option>
        <option value="10 - 7">X - 7</option>
        <option value="10 - 8">X - 8</option>
        <option value="10 - 9">X - 9</option>
        <option value="10 - 10">X - 10</option>
        <option value="10 - 11">X - 11</option>
        <option value="10 - 12">X - 12</option>
        <option value="XI IPA 1">XI IPA 1</option>
        <option value="XI IPA 2">XI IPA 2</option>
        <option value="XI IPA 3">XI IPA 3</option>
        <option value="XI IPA 4">XI IPA 4</option>
        <option value="XI IPA 5">XI IPA 5</option>
        <option value="XI IPA 6">XI IPA 6</option>
        <option value="XI IPS 1">XI IPS 1</option>
        <option value="XI IPS 2">XI IPS 2</option>
        <option value="XI IPS 3">XI IPS 3</option>
        <option value="XI IPS 4">XI IPS 4</option>
        <option value="XI IPS 5">XI IPS 5</option>
        <option value="XI IPS 6">XI IPS 6</option>
        <option value="XII IPA 1">XII IPA 1</option>
        <option value="XII IPA 2">XII IPA 2</option>
        <option value="XII IPA 3">XII IPA 3</option>
        <option value="XII IPA 4">XII IPA 4</option>
        <option value="XII IPA 5">XII IPA 5</option>
        <option value="XII IPA 6">XII IPA 6</option>
        <option value="XII IPS 1">XII IPS 1</option>
        <option value="XII IPS 2">XII IPS 2</option>
        <option value="XII IPS 3">XII IPS 3</option>
        <option value="XII IPS 4">XII IPS 4</option>
        <option value="XII IPS 5">XII IPS 5</option>
        <option value="XII IPS 6">XII IPS 6</option>
      </select>
  )
}
