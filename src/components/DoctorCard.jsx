import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {
  const statusColor = {
    "Available Today": "text-green-600",
    "Fully Booked": "text-red-500",
    "On Leave": "text-yellow-500",
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p className={`mt-1 font-medium ${statusColor[doctor.availability]}`}>
          {doctor.availability}
        </p>
        <Link to={`/doctor/${doctor.id}`}>
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
  View Profile
</button>

        </Link>
      </div>
    </div>
  )
}

export default DoctorCard
