import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "../data/site.js";
import { withBasePath } from "../lib/sitePaths.js";
import { MobileDrawer } from "./MobileDrawer.jsx";

export function Header({ currentPath = "/" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrolledTone, setScrolledTone] = useState("red");
  const headerRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", isMenuOpen);
    return () => document.body.classList.remove("is-menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    function syncScrolledState() {
      const nextScrolled = window.scrollY > 36;
      setIsScrolled(nextScrolled);

      if (!nextScrolled) {
        setScrolledTone("red");
        return;
      }

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 84;
      const probeY = Math.min(window.innerHeight - 1, headerBottom + 12);
      const probeX = Math.round(window.innerWidth / 2);
      const element = document.elementFromPoint(probeX, probeY);
      const tone = element?.closest("[data-header-tone]")?.dataset.headerTone ?? "red";
      setScrolledTone(tone);
    }

    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });
    window.addEventListener("resize", syncScrolledState);

    return () => {
      window.removeEventListener("scroll", syncScrolledState);
      window.removeEventListener("resize", syncScrolledState);
    };
  }, []);

  return (
    <>
      <div className="top-line" aria-hidden="true" />
      <header className={`site-header ${isScrolled ? `is-scrolled tone-${scrolledTone}` : ""}`}>
        <div className="header-inner" ref={headerRef}>
          <a className="brand" href={withBasePath("/")} aria-label="Kefas Ropshik home">
            <img className="brand-mark" src={withBasePath("/decorative/pdp-umbrella.png")} alt="" width="316" height="316" decoding="async" />
            <span className="brand-copy">
              <strong>Kefas Ropshik</strong>
              <span>Plateau State</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} currentPath={currentPath} />
            ))}
          </nav>

          <a className="header-contact" href={withBasePath("/pledge")}>
            Pledge
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        currentPath={currentPath}
      />
    </>
  );
}

function DesktopNavItem({ item, currentPath }) {
  const active = isActive(item, currentPath);

  if (!item.children) {
    return (
      <a className={active ? "active" : ""} href={withBasePath(item.href)}>
        {item.label}
      </a>
    );
  }

  return (
    <div className="desktop-nav-group">
      <a className={active ? "active" : ""} href={withBasePath(item.href)}>
        {item.label}
        <ChevronDown aria-hidden="true" size={15} strokeWidth={2.4} />
      </a>
      <div className="desktop-subnav">
        {item.children.map((child) => (
          <a key={child.label} href={withBasePath(child.href)}>
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function isActive(item, currentPath) {
  if (item.href === "/") return currentPath === "/";
  if (currentPath === item.href || currentPath.startsWith(`${item.href}/`)) return true;
  return item.children?.some((child) => currentPath === child.href || currentPath.startsWith(`${child.href}/`));
}
