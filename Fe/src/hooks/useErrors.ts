import { useState } from 'react';

type error = {
  field: string;
  message: string;
}

export function useErrors() {
  const [errors, setErrors] = useState<error[]>([]);

  function setError({field, message}: error) {
    if(errors.find((err) => err.field === field)) {
      return;
    }

    setErrors(prevState => [...prevState, { field, message}]);
  }

  function removeError(field: string) {
    setErrors(prevState => prevState.filter((err: error) => err.field !== field));
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((err) => err.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
