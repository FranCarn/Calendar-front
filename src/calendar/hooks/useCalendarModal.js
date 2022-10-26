import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { addHours, differenceInSeconds } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const useCalendarModal = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { closeDateModal } = useUiStore();

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length > 3 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changign) => {
    setFormValues({
      ...formValues,
      [changign]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fecha incorrecta", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 3) {
      return;
    }

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  };
  return {
    formValues,
    setFormValues,
    titleClass,
    onDateChange,
    onSubmit,
    onInputChange,
  };
};
