import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Link } from 'react-router-dom';
import { validate } from "./validate"; 

export default function LoginForm() {
  // const [showLogin, setShowLogin] = useState(true);
  // const toggleForm = () => {
  //   setShowLogin(!showLogin);
  // };
  const [formData, setFormData] = useState({
    userName: "",
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
      // Aquí podrías realizar la autenticación o enviar los datos al servidor
      alert("Inicio de sesión exitoso");
    } else {
      alert("Por favor, completa todos los campos correctamente");
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* {showLogin ? ( */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/19643055883023.5996f8afa3a8f.gif"
          alt="Encabezado"
        />
        <label>Nombre de usuario:</label>
        <input
          className={errors.userName && styles.warning}
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <p className={`${styles.danger} danger`}>{errors.userName}</p>
        <label>Contraseña:</label>
        <input
          className={errors.password && styles.warning}
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <p className={`${styles.danger} danger`}>{errors.password}</p>
        <Link to="/home">
          <button type="submit">Iniciar Sesión</button>
        </Link>
      </form>
      {/* ) : (
        // Mostrar formulario de registro
        <Register />
      )} */}
      {/* <div className={styles.toggleButtons}>
        <button onClick={toggleForm}>Login</button>
        <button onClick={toggleForm}>Register</button>
      </div> */}
    </div>
  );
}