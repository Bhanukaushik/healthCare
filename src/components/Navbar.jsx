import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
  <h1 className="text-2xl font-bold text-blue-600">MediConnect</h1>
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    Book Now
  </button>
</nav>

  )
}

export default Navbar
