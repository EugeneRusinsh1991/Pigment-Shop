import { useState, useCallback, useRef, useEffect } from 'react';

export function useForm(initialValues = {}, validator = null) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const initialValuesRef = useRef(initialValues);

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Automatically clear the error for the field being changed
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const validate = useCallback(() => {
    if (!validator) return true;

    const validationErrors = validator(form);
    const hasErrors = Object.keys(validationErrors || {}).length > 0;
    
    setErrors(validationErrors || {});
    return !hasErrors;
  }, [form, validator]);

  const resetForm = useCallback((newInitialValues) => {
    setForm(newInitialValues || initialValuesRef.current);
    setErrors({});
  }, []);

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    validate,
    resetForm,
  };
}
