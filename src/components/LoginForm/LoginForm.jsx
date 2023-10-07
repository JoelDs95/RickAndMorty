import React, { useState, useEffect } from "react";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { validate } from "./validate";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const validateErrors = validate({ [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateErrors[name] || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorsArray = Object.values(errors);

    if (errorsArray.length === 0 && formData.userName && formData.password) {
      alert("Inicio de sesión exitoso");
    } else {
      alert("Por favor, completa todos los campos correctamente");
    }
  };

  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    // Habilita el botón si no hay errores de validación
    setIsButtonDisabled(Object.keys(validationErrors).length > 0);
  }, [formData]);

  return (
    <div className={styles.formContainer}>
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
        {errors.userName && <div className={`${styles.danger} danger`}>{errors.userName}</div>}
        <label>Contraseña:</label>
        <input
          className={errors.password && styles.warning}
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className={`${styles.danger} danger`}>{errors.password}</div>}
        <Link to="/home">
          <button type="submit" disabled={isButtonDisabled}>
            Iniciar Sesión
          </button>
        </Link>
      </form>
    </div>
  );
}
