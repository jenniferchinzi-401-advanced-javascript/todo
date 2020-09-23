// TODO: Figure out why these functions seem to be triggering at the wrong times...and make them do what they ought to do.

import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState()

  const handleInputChange = (event) => {
    console.log('InputChange Event:', event);
    event.preventDefault();
    setValues(values => ({...values, [event.target.name] : event.target.value }));
    console.log('Values in Input Change:', values);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Event:', event.target);
    // event.target.reset();
    callback(values);
    console.log('Values in Handle Submit:', values);
    setValues({});
  }


  
  return [
    handleSubmit,
    handleInputChange,
    values,
  ];
  
}

export default useForm;