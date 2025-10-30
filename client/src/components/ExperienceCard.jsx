import React from 'react'
import { Link } from 'react-router-dom';
export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-white rounded-xl2 border border-[#e9e9ef] shadow-card overflow-hidden">
      <div className="relative">
        <img src={exp.thumbnail} alt={exp.title} className="w-full h-40 object-cover" />
        <div className="absolute left-3 top-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow">
          <div className="text font-semibold">highway <span className="font-light">delite</span></div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-md font-semibold">{exp.title}</h3>
            <div className="text-xs text-gray-500 mt-1">{exp.description}</div>
          </div>
          <div className="text-xs text-gray-400">{exp.tags[0]}</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            From <span className="font-bold">{exp.currency}{exp.price}</span>
          </div>
          <Link
            to={`/experience/${exp.id}`}
            className="px-3 py-1 border border-yellow-50 bg-amber-300 rounded-md text-sm font-medium hover:bg-yellow-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
