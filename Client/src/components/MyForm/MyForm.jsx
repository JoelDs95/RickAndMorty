import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm"; 
import Register from "../RegisterForm/Register"; 
import styledMyForm from "./MyForm.module.css";

export default function MyForm() {
  const [activeForm, setActiveForm] = useState(null);

  const handleFormSwitch = (formName) => {
    setActiveForm(formName);
  };
  const handleBack = () => {
    setActiveForm(null); // Volver a la vista de los botones principales
  };

  return (
    <div className={styledMyForm.container}>
      <div>
        {activeForm ? (
          <button onClick={handleBack} className={styledMyForm.myBackButton}>Atrás</button>
        ) : (
          <>
            <button onClick={() => handleFormSwitch("login")} className={styledMyForm.myButton}>
              Iniciar Sesión
            </button>
            <button onClick={() => handleFormSwitch("register")} className={styledMyForm.myButton}>
              Registrarse
            </button>
          </>
        )}
      </div>
      <div>
        {activeForm === "login" && <LoginForm />}
        {activeForm === "register" && <Register />}
      </div>
    </div>
  );
}
