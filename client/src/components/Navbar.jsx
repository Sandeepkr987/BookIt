import React from 'react'

export default function Navbar({ value, onChange, onSearch }) {
  return (
    <div >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-15 rounded-full bg-black flex items-center justify-center text-white font-bold">hd</div>
          <div className="text-lg font-semibold">highway <span className="font-light">delite</span></div>
        </div>

        <form className="flex items-center gap-2" onSubmit={onSearch}>
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Search experiences"
            className="px-4 py-2 rounded-l-lg border border-gray-300 w-72 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}
