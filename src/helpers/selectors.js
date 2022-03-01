
// Create a function called getAppointmentsForDay that will receive two arguments state and day. The function will return an array of appointments for the given day.
import React from "react";

export function getAppointmentsForDay (state, day) {

  const filteredByDay = state.days.find(givenDay => givenDay.name === day);
  if (!filteredByDay) {
    return [];
  }
  return filteredByDay.appointments.map(aptID => state.appointments[aptID]);
}