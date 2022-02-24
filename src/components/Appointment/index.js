import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment (props) {

  if (!props.time) {
    return (
      <article className="appointment" >No Appointment</article>
    )}
      else {

  return (
    <article className="appointment" >Appointment at {props.time}</article>
  )
}
}