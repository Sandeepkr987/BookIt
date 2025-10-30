import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ExperienceCard from '../components/ExperienceCard'


export default function Home() {
  const [experiences, setExperiences] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchExperiences(q = '') {
    setLoading(true)
    try {
      const url = `http://localhost:5000/api/experience${q ? '?search=' + encodeURIComponent(q) : ''}`
      const res = await fetch(url)
      const data = await res.json()
      setExperiences(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  function onSearch(e) {
    e.preventDefault()
    fetchExperiences(query)
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="bg-white rounded-2xl shadow-md border border-[#f0e6ff] p-6">
        <Navbar
          value={query}
          onChange={setQuery}
          onSearch={onSearch}
        />

        <div className="mt-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading experiences…</div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20 text-gray-600">No experiences found.</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {experiences.map(exp => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
