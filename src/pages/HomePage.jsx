import React, { useEffect, useState } from 'react'
import doctorsData from '../data/doctors.json'
import DoctorCard from '../components/DoctorCard'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData)

  useEffect(() => {
    const filtered = doctorsData.filter(
      doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredDoctors(filtered)
  }, [search])

  return (
    <div className="min-h-screen bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Find Your Doctor
    </h2>

    <input
      type="text"
      placeholder="Search by name or specialization..."
      className="w-full p-3 mb-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredDoctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  </div>
</div>

  )
}

export default HomePage
