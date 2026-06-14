/**
 * Reusable submit button with loading state.
 * @param {Object} props
 * @param {boolean} [props.isLoading]
 * @param {string} [props.loadingText='SAVING...']
 * @param {string} props.children
 * @param {string} [props.className]
 * @param {React.ButtonHTMLAttributes} props.rest
 */
export function SubmitButton({ isLoading, loadingText = 'SAVING...', children, className = '', ...rest }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`px-6 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors disabled:opacity-50 ${className}`}
      {...rest}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
