import { ArrowRight } from "lucide-react";

export function Button({ children, href, variant = "primary", withIcon = false }) {
  return (
    <a className={`button button--${variant}`} href={href}>
      <span>{children}</span>
      {withIcon ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} /> : null}
    </a>
  );
}
