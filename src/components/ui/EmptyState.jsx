import { Link } from 'react-router-dom';

/**
 * Reusable empty state with optional action button.
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.actionLabel]
 * @param {string} [props.actionHref]
 * @param {() => void} [props.onAction]
 */
export function EmptyState({ title, description, actionLabel, actionHref, onAction }) {
  const ActionWrapper = actionHref
    ? ({ children }) => <Link to={actionHref} className="inline-block">{children}</Link>
    : ({ children }) => <button onClick={onAction} className="inline-block">{children}</button>;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <h2 className="text-xl md:text-2xl font-semibold tracking-[0.05em] mb-2">{title}</h2>
      {description && <p className="text-sm opacity-50 max-w-md">{description}</p>}
      {actionLabel && (
        <ActionWrapper>
          <span className="mt-6 px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors cursor-pointer inline-block">
            {actionLabel}
          </span>
        </ActionWrapper>
      )}
    </div>
  );
}
