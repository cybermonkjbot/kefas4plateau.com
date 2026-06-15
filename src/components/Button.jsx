import { ArrowRight } from "lucide-react";
import { withBasePath } from "../lib/sitePaths.js";

export function Button({ children, href, variant = "primary", withIcon = false }) {
  return (
    <a className={`button button--${variant}`} href={withBasePath(href)}>
      <span>{children}</span>
      {withIcon ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} /> : null}
    </a>
  );
}
