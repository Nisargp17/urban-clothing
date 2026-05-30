export function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer';
  const variants = {
    primary: 'bg-[#2a2520] text-white border-2 border-[#2a2520] hover:bg-transparent hover:text-[#2a2520]',
    secondary: 'bg-transparent text-[#2a2520] border-2 border-[#2a2520] hover:bg-[#2a2520] hover:text-white',
    ghost: 'bg-transparent text-[#2a2520] border-none hover:underline',
    danger: 'bg-red-600 text-white border-2 border-red-600 hover:bg-transparent hover:text-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
