import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem (props) {

  const interviewerClass = classNames ( "interviewerListItem", {
    "interviewers__item": props.id,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  });

  return (
  <li className={ interviewerClass } onClick={()=> props.setInterviewer(props.id)}>
    <img className={ interviewerClass } src={ props.avatar } alt={ props.name }/>
    {props.selected && props.name}
  </li>
  )
}