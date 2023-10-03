import React, { useState } from "react";
import styles from "./Form.module.css";
import { validate } from "./validate";

export default function Register() {
  const [formData, setFormData] = useState({
    // Define los campos necesarios para el formulario de registro
    // Ejemplo:
    userName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    const validateErrors = validate({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setErrors(validateErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorsArray = Object.values(errors);

    if (errorsArray.length === 0) {
      // Aquí podrías realizar el registro o enviar los datos al servidor
      alert("Registro exitoso");
    } else {
      alert("Por favor, completa todos los campos correctamente");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Campos de registro */}
        {/* Ejemplo: */}
        <label>Nombre de usuario:</label>
        <input
          className={errors.userName && styles.warning}
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        {/* Otros campos de registro */}
        {/* Ejemplo: */}
        <label>Correo electrónico:</label>
        <input
          className={errors.email && styles.warning}
          type="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Más campos de registro */}
        {/* Ejemplo: */}
        <label>Contraseña:</label>
        <input
          className={errors.password && styles.warning}
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* Más campos de registro */}
        {/* Ejemplo: */}
        <label>Confirmar Contraseña:</label>
        <input
          className={errors.confirmPassword && styles.warning}
          type="password"
          placeholder="Confirma tu contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}