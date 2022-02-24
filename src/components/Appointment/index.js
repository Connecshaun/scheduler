import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment (props) {

  if (!props.time) {
    return "No Appointments"}
      else {

  return (
    <article className="appointment" >Appointment at {props.time}</article>
  )
}
}