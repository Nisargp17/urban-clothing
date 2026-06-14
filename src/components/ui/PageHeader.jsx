/**
 * Reusable page header with label, title, and optional subtitle.
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.children] — extra content (e.g., admin link)
 */
export function PageHeader({ label, title, subtitle, children }) {
  return (
    <div className="mb-10 md:mb-12">
      {label && <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">{label}</p>}
      <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">{title}</h1>
      {subtitle && <p className="text-sm opacity-40 mt-2">{subtitle}</p>}
      {children}
    </div>
  );
}
