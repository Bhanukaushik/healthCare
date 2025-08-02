import React, { createContext, useContext, useEffect, useState } from "react";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const checkAvailability = (doctorId, dateTime) => {
    return !appointments.some(
      (appt) =>
        appt.doctorId === doctorId &&
        new Date(appt.dateTime).toISOString() === new Date(dateTime).toISOString()
    );
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, checkAvailability }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
