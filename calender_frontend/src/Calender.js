import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const CalendarApp = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  const fetchEvents = async () => {
    const response = await axios.get('/api/events');
    setEvents(response.data);
  };

  // Add event to the database
  const handleDateClick = async (info) => {
    const title = prompt('Enter appointment details:');
    if (title) {
      const newEvent = { title, start: info.dateStr };
      await axios.post('/api/events', newEvent); // Save to database
      setEvents([...events, newEvent]); // Update local state
    }
  };

  // Update event (drag/drop functionality)
  const handleEventDrop = async (info) => {
    const updatedEvent = {
      id: info.event.id,
      start: info.event.start,
      end: info.event.end,
    };
    await axios.put(`/api/events/${info.event.id}`, updatedEvent);
    fetchEvents(); // Re-fetch events to ensure sync
  };

  // Delete event
  const handleEventClick = async (info) => {
    if (window.confirm(`Are you sure you want to delete "${info.event.title}"?`)) {
      await axios.delete(`/api/events/${info.event.id}`);
      fetchEvents(); // Re-fetch events
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      events={events}
      editable={true}
      droppable={true}
      dateClick={handleDateClick}
      eventDrop={handleEventDrop}
      eventClick={handleEventClick}
    />
  );
};

export default CalendarApp;
