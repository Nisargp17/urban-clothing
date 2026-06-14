import { SEO } from './SEO';

/**
 * Shared layout for static informational / legal pages.
 * Keeps Terms, Privacy, Cookies, Returns, About visually consistent
 * and reduces duplication. Content is data-driven via `sections`.
 *
 * @param {object} props
 * @param {string} props.title        Page title (used in <h1> and SEO)
 * @param {string} props.description  Meta description for SEO
 * @param {string} props.pathname     Canonical path, e.g. "/terms"
 * @param {string} [props.eyebrow]    Small label above the title
 * @param {string} [props.intro]      Intro paragraph below the title
 * @param {string} [props.lastUpdated] Optional "last updated" date string
 * @param {{ heading: string, body: React.ReactNode }[]} [props.sections]
 * @param {React.ReactNode} [props.children]
 */
export function InfoPageLayout({
  title,
  description,
  pathname,
  eyebrow = 'Urban Clothing',
  intro,
  lastUpdated,
  sections = [],
  children,
}) {
  return (
    <>
      <SEO title={title} description={description} pathname={pathname} />
      <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 md:px-[6vw] bg-[#f5efe6]">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 md:mb-14 border-b border-[#2a2520]/10 pb-8">
            <p className="text-[10px] tracking-[0.3em] opacity-40 mb-3 uppercase">{eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95]">{title}</h1>
            {intro && (
              <p className="text-sm md:text-base opacity-60 leading-relaxed mt-6 max-w-2xl">{intro}</p>
            )}
            {lastUpdated && (
              <p className="text-xs opacity-40 mt-6">Last updated: {lastUpdated}</p>
            )}
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg md:text-xl font-semibold tracking-[0.05em] mb-3">
                  {section.heading}
                </h2>
                <div className="text-sm md:text-[15px] opacity-70 leading-relaxed space-y-3">
                  {typeof section.body === 'string' ? <p>{section.body}</p> : section.body}
                </div>
              </section>
            ))}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
