
// Create a function called getAppointmentsForDay that will receive two arguments state and day. The function will return an array of appointments for the given day.
export function getAppointmentsForDay (state, day) {

  const filteredByDay = state.days.find(givenDay => givenDay.name === day);
  if (!filteredByDay) {
    return [];
  }
  return filteredByDay.appointments.map(aptID => state.appointments[aptID]);
}


//return an object that contains the interview data if it is passed an object that contains an interviewer.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  )
}
