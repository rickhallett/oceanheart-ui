import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  it('should initialize with provided values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialValues));
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('should update values on handleChange', () => {
    const { result } = renderHook(() => useForm({ name: '', email: '' }));
    
    act(() => {
      const event = {
        target: { name: 'name', value: 'John' }
      } as React.ChangeEvent<HTMLInputElement>;
      
      result.current.handleChange(event);
    });
    
    expect(result.current.values.name).toBe('John');
  });

  it('should mark fields as touched on handleBlur', () => {
    const { result } = renderHook(() => useForm({ name: '', email: '' }));
    
    act(() => {
      const event = {
        target: { name: 'name' }
      } as React.FocusEvent<HTMLInputElement>;
      
      result.current.handleBlur(event);
    });
    
    expect(result.current.touched.name).toBe(true);
  });

  it('should validate on blur when validate function is provided', () => {
    const validate = jest.fn().mockReturnValue({ name: 'Name is required' });
    const { result } = renderHook(() => useForm({ name: '', email: '' }, validate));
    
    act(() => {
      const event = {
        target: { name: 'name' }
      } as React.FocusEvent<HTMLInputElement>;
      
      result.current.handleBlur(event);
    });
    
    expect(validate).toHaveBeenCalled();
    expect(result.current.errors.name).toBe('Name is required');
  });

  it('should call onSubmit when form is valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useForm({ name: 'John' }, () => ({}), onSubmit));
    
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });
    
    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should not call onSubmit when validation fails', async () => {
    const validate = jest.fn().mockReturnValue({ name: 'Name is required' });
    const onSubmit = jest.fn();
    
    const { result } = renderHook(() => useForm({ name: '' }, validate, onSubmit));
    
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });
    
    expect(validate).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should reset form state when resetForm is called', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      // Change values
      result.current.setValues({ name: 'Jane', email: 'jane@example.com' });
      
      // Set some errors and touched state
      result.current.setFieldError('name', 'Error');
      result.current.setFieldTouched('name', true);
      
      // Then reset
      result.current.resetForm();
    });
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle individual field updates', () => {
    const { result } = renderHook(() => useForm({ name: 'John', email: '' }));
    
    act(() => {
      result.current.setFieldValue('email', 'john@example.com');
    });
    
    expect(result.current.values).toEqual({ name: 'John', email: 'john@example.com' });
  });
});