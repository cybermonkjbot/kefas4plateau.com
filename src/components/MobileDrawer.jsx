import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "./Button.jsx";

export function MobileDrawer({ isOpen, onClose, navItems, currentPath }) {
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <button className="mobile-overlay" type="button" aria-label="Close menu" onClick={onClose} />
      <nav id="mobile-navigation" className="mobile-drawer" aria-label="Mobile navigation">
        <div className="mobile-drawer-head">
          <button className="mobile-close" type="button" aria-label="Close menu" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-nav-list">
          {navItems.map((item) =>
            item.children ? (
              <MobileGroup
                key={item.label}
                item={item}
                isOpen={openGroup === item.key}
                onToggle={() => setOpenGroup(openGroup === item.key ? null : item.key)}
                onClose={onClose}
                currentPath={currentPath}
              />
            ) : (
              <a
                key={item.label}
                className={`mobile-nav-link ${isActive(item.href, currentPath) ? "active" : ""}`}
                href={item.href}
                onClick={onClose}
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="mobile-drawer-foot">
          <Button href="/pledge" variant="primary">
            Pledge
          </Button>
          <p>Volunteer, organize, create, or back the work</p>
        </div>
      </nav>
    </>
  );
}

function MobileGroup({ item, isOpen, onToggle, onClose, currentPath }) {
  const active = isActive(item.href, currentPath) || item.children.some((child) => isActive(child.href, currentPath));

  return (
    <div className="mobile-group">
      <button
        className={`mobile-nav-link mobile-group-button ${active ? "active" : ""}`}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{item.label}</span>
        <ChevronDown aria-hidden="true" className={isOpen ? "is-open" : ""} />
      </button>
      {isOpen ? (
        <div className="mobile-subnav">
          <a className={isActive(item.href, currentPath) ? "active" : ""} href={item.href} onClick={onClose}>
            Overview
          </a>
          {item.children.map((child) => (
            <a
              className={isActive(child.href, currentPath) ? "active" : ""}
              key={child.label}
              href={child.href}
              onClick={onClose}
            >
              {child.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function isActive(href, currentPath) {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
