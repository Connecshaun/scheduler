import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm"

import "components/Appointment/styles.scss";

export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  // const CONFIRM = "CONFIRM"
  
  const save = function (name, interviewer_id) {
    const interview = {
      student: name,
      interviewer: interviewer_id,
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const confirmDeleteInterview = () => transition(DELETING)

  const deleteInterview = function () {
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY));
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
    <Header time={ props.time} />
    { mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
    { mode === SHOW && (<Show student={ props.interview.student } interviewer={ props.interview.interviewer } onDelete={ confirmDeleteInterview } onEdit={() => transition(EDIT)} />)}
    { mode === CREATE && (<Form interviewers={[props.interviewers]} onCancel={() => back()} onSave={ save } />)}
    { mode === SAVING && (<Status message={ "SAVING" } />)}
    { mode === EDIT && (<Form interviewers={[props.interviewers]} interviewer={ props.interview.interviewer } student={ props.interview.student } onCancel={() => back()} onSave={ save } onCancel={() => back()} />)}
    { mode === DELETING && (<Confirm onCancel={() => back()} onConfirm={ deleteInterview } />)}
    </article>
  )
}