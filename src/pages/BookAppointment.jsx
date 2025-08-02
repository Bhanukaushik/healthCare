import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import doctors from '../data/doctors.json';

const BookAppointment = () => {
  const { id } = useParams();
  const doctor = doctors.find((doc) => doc.id === parseInt(id));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState(null);

  const generateAvailableTimes = () => {
    const slots = [];
    const addSlots = (start, end) => {
      const time = new Date();
      time.setHours(start, 0, 0, 0);
      const endTime = new Date();
      endTime.setHours(end, 0, 0, 0);
      while (time < endTime) {
        slots.push(new Date(time));
        time.setMinutes(time.getMinutes() + 30);
      }
    };
    addSlots(10, 14); // 10am–2pm
    addSlots(17, 21); // 5pm–9pm
    return slots;
  };

  const availableTimes = generateAvailableTimes();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const isBooked = existingAppointments.some((appt) => {
      return (
        appt.doctorId === doctor.id &&
        new Date(appt.dateTime).getTime() === dateTime?.getTime()
      );
    });

    if (isBooked) {
      toast.error('This time slot is already booked!');
      return;
    }

    const newAppointment = {
      doctorId: doctor.id,
      name,
      email,
      dateTime: dateTime.toISOString(),
    };
    localStorage.setItem(
      'appointments',
      JSON.stringify([...existingAppointments, newAppointment])
    );
    toast.success('Appointment booked successfully!');
    setName('');
    setEmail('');
    setDateTime(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Book Appointment with Dr. {doctor.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Patient Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Select Date & Time</label>
          <DatePicker
            selected={dateTime}
            onChange={(date) => setDateTime(date)}
            showTimeSelect
            timeIntervals={30}
            filterTime={(time) => {
              const selected = new Date(time);
              return availableTimes.some(
                (t) => t.getHours() === selected.getHours() && t.getMinutes() === selected.getMinutes()
              );
            }}
            minDate={new Date()}
            placeholderText="Click to select"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Available slots: 10am–2pm & 5pm–9pm (every 30 minutes)
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
