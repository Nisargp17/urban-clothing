import { useId } from 'react';

/**
 * Reusable form field: label + input/select/textarea + error.
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} [props.type='text']
 * @param {string} [props.placeholder]
 * @param {string} props.value
 * @param {(e: React.ChangeEvent) => void} props.onChange
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 * @param {boolean} [props.fullWidth]
 * @param {React.ReactNode} [props.children] — for select options
 * @param {'input' | 'select' | 'textarea'} [props.as='input']
 */
export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  fullWidth,
  children,
  as = 'input',
}) {
  const id = useId();
  const baseClasses = `w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] transition-colors ${
    error ? 'border-red-400' : 'border-[#2a2520]/20'
  }`;

  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {as === 'select' ? (
        <select id={id} name={name} value={value} onChange={onChange} className={`${baseClasses} bg-white`} required={required}>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
          required={required}
          rows={4}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
          required={required}
        />
      )}
      {error && <p className="text-[10px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
