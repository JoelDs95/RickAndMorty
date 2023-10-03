const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validate(formData){
    const errors = {};
   
    if(!regexEmail.test(formData.userName)){
      errors.userName = 'Debe ser un correo Usuario valido'
    }
    if(!formData.userName){
      errors.userName = 'El Usuario no puede estar vacio'
    }
    if(!formData.password ){
      errors.password = 'Se requiere Contraseña'
    }
    if(!formData.password){
      errors.password = 'El Usuario no puede estar vacio'
    }
   
    return errors
   };