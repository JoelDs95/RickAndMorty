const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validate(formData) {
  const errors = {};

  if (!regexEmail.test(formData.userName)) {
    errors.userName = "Debe ser un correo Usuario valido";
  }
  if (!formData.userName) {
    errors.userName = "El Usuario no puede estar vacio";
  }

  if (!formData.password) {
    errors.password = "Se requiere Contraseña";
  } else if (formData.password.length < 6 || formData.password.length > 10) {
    errors.password = "La contraseña debe tener entre 6 y 10 caracteres";
  } else if (
    !/[A-Z]/.test(formData.password) ||
    !/\d/.test(formData.password)
  ) {
    errors.password =
      "La contraseña debe contener al menos una letra mayúscula y un número";
  }
  return errors;
}
