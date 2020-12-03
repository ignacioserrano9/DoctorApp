import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types"

const Formulario = ({ crearCita }) => {
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false);

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    //Elimina mensaje de error
    actualizarError(false);

    //Asignar id
    cita.id = uuidv4();

    //Crear cita
    crearCita(cita);

    //Reiniciar form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      {error ? <p className="alerta-error">All fields are obligatory</p> : null}

      <form onSubmit={submitCita}>
        <label>Pet Name</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Owner Name"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Owner Name</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Owner Name"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Date</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Time</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Symptoms</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
