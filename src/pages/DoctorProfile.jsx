import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import doctors from "../data/doctors.json";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return <div className="text-center mt-10 text-red-500">Doctor not found</div>;
  }

  const handleBook = () => {
    navigate(`/book/${doctor.id}`);
  };

  const isUnavailable = !doctor.availability || doctor.availability.toLowerCase() === "on leave";

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6">
        <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full object-cover" />
        <div>
          <h2 className="text-3xl font-bold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-gray-500">Experience: {doctor.experience} years</p>
          <p className={`mt-2 ${isUnavailable ? "text-red-500" : "text-green-600"}`}>
            {isUnavailable ? "Currently on leave" : "Available"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold">About:</p>
        <p className="text-gray-700 mt-1">{doctor.bio || "No bio available."}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleBook}
          disabled={isUnavailable}
          className={`px-4 py-2 rounded ${
            isUnavailable
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isUnavailable ? "Unavailable for Booking" : "Book Appointment"}
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
