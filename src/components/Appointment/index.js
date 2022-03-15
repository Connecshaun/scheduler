import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"

import "components/Appointment/styles.scss";

export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  const confirmDeleteInterview = () => transition(CONFIRM)

  const deleteInterview = function () {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={ props.time} />

      { mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}

      { mode === SHOW && (<Show student={ props.interview.student } interviewer={ props.interview.interviewer } onDelete={ confirmDeleteInterview } onEdit={() => transition(EDIT)} />)}

      { mode === CREATE && (<Form interviewers={ props.interviewers } onCancel={() => back()} onSave={ save } />)}

      { mode === SAVING && (<Status message={ "SAVING" } />)}

      { mode === EDIT && (<Form interviewers={ props.interviewers } interviewer={ props.interview.interviewer.id } student={ props.interview.student } onCancel={() => back()} onSave={ save } />)}

      { mode === DELETING && (<Status message={ "Deleting" } />)}

      { mode === CONFIRM && (<Confirm onCancel={() => back()} onConfirm={ deleteInterview } />)}

      { mode === ERROR_DELETE && (<Error message={ "Could not delete appointment" } onClose={back} />)}

      { mode === ERROR_SAVE && (<Error message={"Could not save"} onClose={back} />)}
    </article>
  )
}