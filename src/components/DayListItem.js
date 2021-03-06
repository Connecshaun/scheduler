import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem (props) {
  
  const dayClass = classNames("day-list", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function (spots) {
    if (spots > 1) {
      return `${spots} spots remaining`
    }
    if (spots === 1) {
      return `${spots} spot remaining`
    }
    if (spots === 0) {
      return "no spots remaining"
    }
  }

  return (
    <li className={ dayClass } onClick={() => props.setDay(props.name)} selected={ props.selected }>
      <h2 className="text--regular">{ props.name }</h2>
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  );
} 