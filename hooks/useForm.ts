import { useState } from 'react';

/**
 * A custom hook for managing form state, validation, and submission.
 * 
 * @param initialValues - The initial values for the form fields
 * @param validate - Optional validation function that returns errors for the form values
 * @param onSubmit - Optional submission handler function
 * 
 * @returns An object containing form state and handlers
 * 
 * @example
 * ```tsx
 * const LoginForm = () => {
 *   const validate = (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Email is required';
 *     if (!values.password) errors.password = 'Password is required';
 *     return errors;
 *   };
 * 
 *   const handleSubmit = async (values) => {
 *     await login(values.email, values.password);
 *   };
 * 
 *   const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm } = 
 *     useForm({ email: '', password: '' }, validate, handleSubmit);
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input 
 *         name="email" 
 *         value={values.email} 
 *         onChange={handleChange} 
 *         onBlur={handleBlur} 
 *       />
 *       {touched.email && errors.email && <div>{errors.email}</div>}
 *       
 *       <input 
 *         type="password" 
 *         name="password" 
 *         value={values.password} 
 *         onChange={handleChange} 
 *         onBlur={handleBlur} 
 *       />
 *       {touched.password && errors.password && <div>{errors.password}</div>}
 *       
 *       <button type="submit" disabled={isSubmitting}>Submit</button>
 *     </form>
 *   );
 * };
 * ```
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>,
  onSubmit?: (values: T) => void | Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles input changes and updates the form values
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle different input types appropriately
    let parsedValue: any = value;
    
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    
    setValues({ ...values, [name]: parsedValue });
  };

  /**
   * Handles input blur events and marks fields as touched
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    
    if (validate) {
      setErrors(validate(values));
    }
  };

  /**
   * Handles form submission, validates values, and calls the onSubmit handler if validation passes
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );
    
    setTouched(allTouched);
    
    // Validate the form
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }
    
    // If there are no validation errors and onSubmit is provided, submit the form
    if (Object.keys(validationErrors).length === 0 && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /**
   * Resets the form to its initial state
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  /**
   * Sets a specific field value programmatically
   */
  const setFieldValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Sets a specific field error programmatically
   */
  const setFieldError = (field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  /**
   * Marks a specific field as touched programmatically
   */
  const setFieldTouched = (field: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setFieldValue,
    setFieldError,
    setFieldTouched
  };
}