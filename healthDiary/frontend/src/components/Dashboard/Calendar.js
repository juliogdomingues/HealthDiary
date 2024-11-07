import React, { useRef, useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { EventContext } from '../../context/EventContext';
import './Dashboard.css';

const Calendar = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const { events, loading, fetchEvents } = useContext(EventContext);

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const clickedTime = arg.date.toTimeString().slice(0, 5);
    navigate('/dashboard/sintomas/adicionar', { state: { data: clickedDate, hora: clickedTime } });
  };

  const changeView = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const updateTitle = (calendarApi) => {
    const monthYear = calendarApi.getDate().toLocaleString('default', { month: 'long', year: 'numeric' });
    setCurrentTitle(monthYear);
  };

  const handleDayCellClassNames = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
      ? 'today-highlight'
      : '';
  };

  useEffect(() => {
    fetchEvents();
    const calendarApi = calendarRef.current.getApi();
    updateTitle(calendarApi);
  }, [fetchEvents]);

  return (
    <Box className="calendar-container">
      <div className="calendar-view-buttons">
        <Button className="apple-button" onClick={() => changeView('dayGridMonth')}>Month</Button>
        <Button className="apple-button" onClick={() => changeView('timeGridWeek')}>Week</Button>
        <Button className="apple-button" onClick={() => changeView('timeGridDay')}>Day</Button>
      </div>

      <div className="calendar-header">
        <h2 className="calendar-title">{currentTitle}</h2>
        <Button className="apple-button" onClick={handlePrevClick}><ArrowBack fontSize="small" /></Button>
        <Button className="apple-button" onClick={handleTodayClick}>Today</Button>
        <Button className="apple-button" onClick={handleNextClick}><ArrowForward fontSize="small" /></Button>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}  // Event data comes from context
        dateClick={handleDateClick}
        headerToolbar={false} // Disable default toolbar
        eventColor="transparent" // Ensure transparent background for events
        dayCellClassNames={(arg) => handleDayCellClassNames(arg.date)} // Apply custom class for today's date
        eventContent={(eventInfo) => (
          <div className="symptoms-list">
            {eventInfo.event.extendedProps.symptoms && eventInfo.event.extendedProps.symptoms.length > 0 && (
              eventInfo.event.extendedProps.symptoms.map((symptom, index) => (
                <div key={index} className="symptom-item">
                  <span className="bullet-point"></span>
                  <span>{symptom}</span>
                </div>
              ))
            )}
          </div>
        )}
        height="auto"
        datesSet={(info) => updateTitle(info.view.calendar)} // Update title when the view changes
        viewDidMount={(info) => updateTitle(info.view.calendar)} // Set the title when the view is mounted
      />
    </Box>
  );
};

export default Calendar;
