import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get('/api/events');
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.title}</td>
              <td>{new Date(appointment.start).toLocaleDateString()}</td>
              <td>{new Date(appointment.start).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryPage;
