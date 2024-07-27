import { InputHTMLAttributes, forwardRef } from "react";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={rest.name} className="block mb-2 text-md">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full p-2 bg-white appearance-none rounded-md border text-md ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...rest}
          placeholder={label}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;