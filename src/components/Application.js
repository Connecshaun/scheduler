import React, { useState, useEffect } from "react";
import Axios from "axios";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });


  const bookInterview = function (id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
      };

    return Axios.put(`/api/appointments/${id}`, { interview })
    .then((res) => {
      setState({
        ...state,
        appointments
     })
    })
  };



  useEffect(() => {
  Promise.all([
    Axios.get('/api/days'),
    Axios.get('/api/appointments'),
    Axios.get('/api/interviewers')
  ])
    .then((all) => {
      setState(res => ({
        ...res,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
}, [])


  return (
    <main className="layout">
      <section className="sidebar">
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu"><DayList days={ state.days } day={ state.day } setDay={ setDay }/></nav>
      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        { dailyAppointments.map(appointment => {const interview = getInterview(state, appointment.interview);
            return (<Appointment key={ appointment.id} {...appointment} id={ appointment.id } time={ appointment.time } interview={ interview } interviewers={ dailyInterviewers } bookInterview={ bookInterview }
            />); 
            }) 
            }
         < Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
