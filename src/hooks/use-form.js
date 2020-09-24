import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if(event) event.preventDefault();
    event.target.reset();
    callback(values);
    setValues({});
  }

  const handleInputChange = (event) => {
    event.persist();
    setValues(values => ({...values, [event.target.name] : event.target.value }));
  }

  // Note to self - Order of Return must match Order of the const declaration in form.js (line 9) if we're using an array
  return [
    handleSubmit,
    handleInputChange,
  ];
  
}

export default useForm;