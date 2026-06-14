/**
 * Reusable error state with retry action.
 * @param {Object} props
 * @param {string} props.message
 * @param {() => void} [props.onRetry]
 * @param {string} [props.className]
 */
export function ErrorState({ message, onRetry, className = '' }) {
  return (
    <div className={`text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between ${className}`}>
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="underline font-medium ml-4 hover:text-red-800">
          Retry
        </button>
      )}
    </div>
  );
}
