import { useEffect, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Seo } from "./components/Seo.jsx";
import { Footer } from "./components/Footer.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { AgendaPage } from "./pages/AgendaPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { ConsensusFeedPage } from "./pages/ConsensusFeedPage.jsx";
import { GalleryPage } from "./pages/GalleryPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NewsPage } from "./pages/NewsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { PledgePage } from "./pages/PledgePage.jsx";
import { PlateauPage } from "./pages/PlateauPage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";
import { PublicServicePage } from "./pages/PublicServicePage.jsx";
import { WatchPage } from "./pages/WatchPage.jsx";
import { stripBasePath, withBasePath } from "./lib/sitePaths.js";

export function App({ initialPath }) {
  const [path, setPath] = useState(() => getCurrentPath(initialPath));
  const page = getPage(path);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function syncPath() {
      setPath(normalizePath(stripBasePath(window.location.pathname)));
    }

    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  if (page.standalone) {
    return (
      <>
        <Seo path={path} />
        {page.element}
      </>
    );
  }

  return (
    <>
      <Seo path={path} />
      <Header currentPath={path} />
      <main>{page.element}</main>
      <Footer />
    </>
  );
}

function getPage(path) {
  if (path === "/") return { element: <HomePage />, standalone: false };
  if (path === "/about") return { element: <AboutPage />, standalone: false };
  if (path === "/public-service" || path.startsWith("/public-service/")) {
    return { element: <PublicServicePage currentPath={path} />, standalone: false };
  }
  if (path === "/projects") return { element: <RouteRedirect href="/public-service" />, standalone: false };
  if (path.startsWith("/projects/")) {
    return { element: <ProjectsPage slug={path.replace("/projects/", "")} />, standalone: false };
  }
  if (path === "/agenda" || path.startsWith("/agenda/")) {
    return { element: <AgendaPage currentPath={path} />, standalone: false };
  }
  if (path === "/news") return { element: <NewsPage />, standalone: false };
  if (path === "/consensus-feed") return { element: <ConsensusFeedPage />, standalone: false };
  if (path === "/gallery") return { element: <GalleryPage />, standalone: false };
  if (path === "/plateau") return { element: <PlateauPage />, standalone: false };
  if (path === "/pledge") return { element: <PledgePage />, standalone: true };
  if (path === "/admin") return { element: <AdminPage />, standalone: true };
  if (path === "/watch") return { element: <WatchPage />, standalone: true };
  if (path === "/contact") return { element: <ContactPage />, standalone: false };
  if (path === "/404") return { element: <NotFoundPage />, standalone: false };
  return { element: <NotFoundPage />, standalone: false };
}

function RouteRedirect({ href }) {
  useEffect(() => {
    const targetHref = withBasePath(href);

    if (window.location.pathname !== targetHref) {
      window.history.replaceState({}, "", targetHref);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [href]);

  return null;
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

function getCurrentPath(initialPath) {
  if (initialPath) return normalizePath(initialPath);
  if (typeof window === "undefined") return "/";
  return normalizePath(stripBasePath(window.location.pathname));
}
