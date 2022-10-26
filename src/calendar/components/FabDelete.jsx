import React from "react";
import { useSelector } from "react-redux";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();
  const handleDelete = () => {
    startDeleteEvent();
  };

  const test = !isDateModalOpen;

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected && test ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
