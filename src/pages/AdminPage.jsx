import { useEffect, useMemo, useState } from "react";
import { KeyRound, Search, ShieldCheck } from "lucide-react";

const adminStorageKey = "kefas-admin-token";

export function AdminPage() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem(adminStorageKey) || "";
  });
  const [draftToken, setDraftToken] = useState("");
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [selectedPledgeId, setSelectedPledgeId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [sessionState, setSessionState] = useState({ loading: false, error: "", configured: true });
  const [dashboardState, setDashboardState] = useState({ loading: false, error: "" });

  useEffect(() => {
    document.body.classList.add("admin-page-body");
    return () => document.body.classList.remove("admin-page-body");
  }, []);

  useEffect(() => {
    setDraftToken(token);
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;

    const activity = { current: true };
    verifySession(token, activity, setSessionState, setToken);
    return () => {
      activity.current = false;
    };
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;

    const activity = { current: true };
    loadDashboard({
      token,
      search: submittedSearch,
      activity,
      setDashboard,
      setDashboardState,
      setSessionState,
      setToken,
    });
    return () => {
      activity.current = false;
    };
  }, [token, submittedSearch, refreshKey]);

  const summaryItems = useMemo(() => {
    if (!dashboard) return [];

    const summary = dashboard.summary;
    return [
      {
        label: "Public count",
        value: formatNumber(dashboard.countPresentation.count),
        note: dashboard.countPresentation.mode === "demo" ? "demo view" : "live view",
      },
      {
        label: "Real pledges",
        value: formatNumber(summary.totalPledges),
        note: `${formatNumber(summary.filteredCount)} visible`,
      },
      {
        label: "Last 24h",
        value: formatNumber(summary.pledgesLastDay),
        note: `${formatNumber(summary.pledgesLastWeek)} in 7d`,
      },
      {
        label: "With selfie",
        value: getPercentage(summary.selfieCount, summary.totalPledges),
        note: formatNumber(summary.selfieCount),
      },
    ];
  }, [dashboard]);

  const quickFilters = useMemo(() => {
    if (!dashboard) return [];

    return [
      ...dashboard.roles.slice(0, 3).map((item) => ({
        key: `role-${item.role}`,
        label: item.role,
        count: item.count,
      })),
      ...dashboard.focusAreas.slice(0, 3).map((item) => ({
        key: `focus-${item.focus}`,
        label: item.focus,
        count: item.count,
      })),
    ];
  }, [dashboard]);

  const selectedPledge = useMemo(
    () => dashboard?.pledges?.find((pledge) => pledge.id === selectedPledgeId) || dashboard?.pledges?.[0] || null,
    [dashboard, selectedPledgeId],
  );

  const loginHighlights = [
    "Review the latest signups in one place.",
    "Search by role, focus, location, or supporter note.",
    "Open one pledge and see the full context instantly.",
  ];

  const showUnlockScreen = !token;
  const showOpeningScreen = Boolean(token) && sessionState.loading && !dashboard;
  const showDashboardLoadError = Boolean(dashboardState.error) && !dashboard;
  const showDashboardLoadingState = dashboardState.loading && !dashboard;

  useEffect(() => {
    if (!dashboard?.pledges?.length) {
      setSelectedPledgeId("");
      return;
    }

    const exists = dashboard.pledges.some((pledge) => pledge.id === selectedPledgeId);
    if (!exists) {
      setSelectedPledgeId(dashboard.pledges[0].id);
    }
  }, [dashboard, selectedPledgeId]);

  function handleSignIn(event) {
    event.preventDefault();
    const nextToken = draftToken.trim();
    if (!nextToken) {
      setSessionState((current) => ({ ...current, error: "Enter the admin password." }));
      return;
    }

    setToken(nextToken);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(adminStorageKey, nextToken);
    }
    setSessionState({ loading: true, error: "", configured: true });
  }

  function handleSignOut() {
    setToken("");
    setDraftToken("");
    setDashboard(null);
    setSessionState({ loading: false, error: "", configured: true });
    setDashboardState({ loading: false, error: "" });
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(adminStorageKey);
    }
  }

  function applyQuickFilter(value) {
    setSearch(value);
    setSubmittedSearch(value);
  }

  return (
    <main className="admin-page" id="main">
      <section className="admin-shell">
        <div className="admin-topbar">
          <div>
            <h1>Pledge dashboard</h1>
          </div>
          <div className="admin-topbar-actions">
            <a className="admin-quiet-link" href="/" aria-label="Back to site">
              View site
            </a>
            {token ? (
              <button className="admin-signout" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            ) : null}
          </div>
        </div>

        {showUnlockScreen ? (
          <section className="admin-auth-stage" aria-labelledby="admin-login-title">
            <article className="admin-auth-card admin-auth-card--intro">
              <div className="admin-login-copy">
                <ShieldCheck aria-hidden="true" size={20} strokeWidth={2.2} />
                <div>
                  <h2 id="admin-login-title">Unlock the dashboard</h2>
                </div>
              </div>

              <div className="admin-login-highlights">
                {loginHighlights.map((item) => (
                  <div className="admin-login-highlight" key={item}>
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-auth-card admin-auth-card--form">
              <form className="admin-login-form" onSubmit={handleSignIn}>
                <label className="admin-field">
                  <span>Password</span>
                  <div className="admin-input-wrap">
                    <KeyRound aria-hidden="true" size={16} strokeWidth={2.2} />
                    <input
                      autoComplete="current-password"
                      placeholder="Admin password"
                      type="password"
                      value={draftToken}
                      onChange={(event) => setDraftToken(event.target.value)}
                    />
                  </div>
                </label>
                <button className="admin-primary-button" type="submit">
                  {sessionState.loading ? "Checking..." : "Open dashboard"}
                </button>
              </form>

              {sessionState.error ? (
                <p className="admin-status admin-status--error" role="alert">
                  {sessionState.error}
                </p>
              ) : null}
              {!sessionState.configured ? (
                <p className="admin-status" role="status">
                  Set `PLEDGE_ADMIN_PASSWORD` on the server before using this page.
                </p>
              ) : null}
            </article>
          </section>
        ) : showOpeningScreen ? (
          <section className="admin-opening-panel" aria-live="polite">
            <div className="admin-login-copy">
              <ShieldCheck aria-hidden="true" size={20} strokeWidth={2.2} />
              <div>
                <h2>Opening dashboard</h2>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="admin-dashboard-head" aria-label="Dashboard heading">
              <div className="admin-dashboard-copy">
                <h2>Pledges</h2>
              </div>
              <div className="admin-dashboard-actions">
                <button className="admin-quiet-link" type="button" onClick={() => setRefreshKey((value) => value + 1)}>
                  Refresh
                </button>
              </div>
            </section>

            <section className="admin-toolbar" aria-label="Dashboard controls">
              <form
                className="admin-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmittedSearch(search.trim());
                }}
              >
                <label className="admin-input-wrap admin-input-wrap--search">
                  <Search aria-hidden="true" size={16} strokeWidth={2.2} />
                  <input
                    placeholder="Search name, email, location, role, focus, or note"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                {search ? (
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSubmittedSearch("");
                    }}
                  >
                    Clear
                  </button>
                ) : null}
                <button className="admin-primary-button" type="submit">
                  Apply
                </button>
              </form>
            </section>

            {dashboardState.error ? (
              <p className="admin-status admin-status--error" role="alert">
                {dashboardState.error}
              </p>
            ) : null}
            {dashboardState.loading ? (
              <p className="admin-status" role="status">
                Refreshing the latest pledge activity.
              </p>
            ) : null}

            {showDashboardLoadError ? (
              <section className="admin-state-panel" role="alert">
                <h3>We couldn&apos;t open the pledge workspace.</h3>
                <p>Try refreshing once. If it keeps failing, sign out and confirm the local admin APIs are running with the right password.</p>
                <div className="admin-state-actions">
                  <button className="admin-primary-button" type="button" onClick={() => setRefreshKey((value) => value + 1)}>
                    Retry
                  </button>
                  <button className="admin-secondary-button" type="button" onClick={handleSignOut}>
                    Sign out
                  </button>
                </div>
              </section>
            ) : showDashboardLoadingState ? (
              <section className="admin-state-panel" aria-live="polite">
                <h3>Loading pledge activity</h3>
                <p>Pulling the latest supporter list and dashboard totals now.</p>
              </section>
            ) : dashboard ? (
              <>
                <section className="admin-summary-bar" aria-label="Pledge summary">
                  {summaryItems.map((item) => (
                    <article className="admin-summary-item" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <small>{item.note}</small>
                    </article>
                  ))}
                </section>

                <section className="admin-quick-filters" aria-label="Quick filters">
                  {quickFilters.map((item) => (
                    <button
                      key={item.key}
                      className={`admin-filter-chip ${submittedSearch === item.label ? "is-active" : ""}`}
                      type="button"
                      onClick={() => applyQuickFilter(item.label)}
                    >
                      <span>{item.label}</span>
                      <strong>{formatNumber(item.count)}</strong>
                    </button>
                  ))}
                  {submittedSearch ? (
                    <button
                      className="admin-filter-chip admin-filter-chip--clear"
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSubmittedSearch("");
                      }}
                    >
                      Clear filter
                    </button>
                  ) : null}
                </section>

                <section className="admin-drilldown" aria-labelledby="admin-pledges-title">
                  <article className="admin-panel admin-panel--list">
                    <div className="admin-panel-head">
                      <div>
                        <h2 id="admin-pledges-title">Recent pledges</h2>
                        <p>{formatNumber(dashboard?.summary?.filteredCount || 0)} in this view.</p>
                      </div>
                    </div>

                    <div className="admin-list">
                      {(dashboard?.pledges || []).map((pledge) => (
                        <button
                          key={pledge.id}
                          className={`admin-pledge-row ${selectedPledge?.id === pledge.id ? "is-active" : ""}`}
                          type="button"
                          onClick={() => setSelectedPledgeId(pledge.id)}
                        >
                          <div className="admin-pledge-row-main">
                            <strong>{pledge.name}</strong>
                            <span>
                              {pledge.role} · {pledge.focus}
                            </span>
                            <small>{truncateText(pledge.note, 82)}</small>
                          </div>
                          <div className="admin-pledge-row-meta">
                            <span>{pledge.location}</span>
                            <time dateTime={pledge.submittedAt}>{formatShortDateTime(pledge.submittedAt)}</time>
                          </div>
                        </button>
                      ))}

                      {dashboard.pledges.length === 0 ? (
                        <div className="admin-empty">
                          <p>No pledges match this search yet.</p>
                        </div>
                      ) : null}
                    </div>
                  </article>

                  <aside className="admin-panel admin-panel--detail" aria-labelledby="pledge-detail-title">
                    {selectedPledge ? (
                      <>
                        <div className="admin-panel-head admin-panel-head--detail">
                          <div>
                            <h2 id="pledge-detail-title">{selectedPledge.name}</h2>
                            <p>{selectedPledge.role} ready to help on {selectedPledge.focus}.</p>
                          </div>
                          <span className="admin-results">{formatDateTime(selectedPledge.submittedAt)}</span>
                        </div>

                        <div className="admin-detail-actions">
                          <a className="admin-primary-button admin-primary-button--small" href={`mailto:${selectedPledge.email}`}>
                            Email
                          </a>
                          {selectedPledge.phone ? (
                            <a className="admin-secondary-button admin-secondary-button--link" href={`tel:${selectedPledge.phone}`}>
                              Call
                            </a>
                          ) : null}
                        </div>

                        <div className="admin-detail-tags">
                          <span>{selectedPledge.ageBand}</span>
                          <span>{selectedPledge.location}</span>
                          <span>{selectedPledge.availability}</span>
                          <span>{selectedPledge.hasSelfie ? "Selfie added" : "No selfie"}</span>
                        </div>

                        <div className="admin-detail-grid">
                          <DetailItem label="Email" value={selectedPledge.email} href={`mailto:${selectedPledge.email}`} />
                          <DetailItem label="Phone" value={selectedPledge.phone || "Not added"} />
                          <DetailItem label="Location" value={selectedPledge.location} />
                          <DetailItem label="Age band" value={selectedPledge.ageBand} />
                          <DetailItem label="Availability" value={selectedPledge.availability} />
                          <DetailItem label="Selfie" value={selectedPledge.hasSelfie ? "Added" : "Not added"} />
                          <DetailItem label="Source" value={selectedPledge.source} />
                          <DetailItem label="IP address" value={selectedPledge.ipAddress || "Unknown"} />
                        </div>

                        <div className="admin-detail-note">
                          <span>Support note</span>
                          <p>{selectedPledge.note}</p>
                        </div>

                        <div className="admin-detail-meta">
                          <span>Browser</span>
                          <p>{selectedPledge.userAgent || "Unknown user agent"}</p>
                        </div>
                      </>
                    ) : (
                      <div className="admin-empty">
                        <p>Select a pledge to see the full details.</p>
                      </div>
                    )}
                  </aside>
                </section>
              </>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}

async function verifySession(token, activity, setSessionState, setToken) {
  setSessionState({ loading: true, error: "", configured: true });

  try {
    const response = await fetch("/api/admin/session", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (activity.current) {
        setSessionState({
          loading: false,
          error: payload.error || "Admin access denied.",
          configured: payload.configured !== false,
        });
        if (response.status === 401 && typeof window !== "undefined") {
          window.sessionStorage.removeItem(adminStorageKey);
          setToken("");
        }
      }
      return;
    }

    if (activity.current) {
      setSessionState({ loading: false, error: "", configured: true });
    }
  } catch {
    if (activity.current) {
      setSessionState({
        loading: false,
        error: "We couldn't verify admin access just now.",
        configured: true,
      });
    }
  }
}

async function loadDashboard({
  token,
  search,
  activity,
  setDashboard,
  setDashboardState,
  setSessionState,
  setToken,
}) {
  setDashboardState({ loading: true, error: "" });

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const response = await fetch(`/api/admin/pledges?${params.toString()}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (activity.current) {
        setDashboardState({
          loading: false,
          error: payload.error || "We couldn't load the admin dashboard.",
        });
        setSessionState((current) => ({
          ...current,
          configured: payload.configured !== false,
        }));
        if (response.status === 401 && typeof window !== "undefined") {
          window.sessionStorage.removeItem(adminStorageKey);
          setToken("");
        }
      }
      return;
    }

    if (activity.current) {
      setDashboard(payload);
      setDashboardState({ loading: false, error: "" });
    }
  } catch {
    if (activity.current) {
      setDashboardState({
        loading: false,
        error: "We couldn't load the dashboard right now.",
      });
    }
  }
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function getPercentage(part, total) {
  if (!total) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatShortDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function truncateText(value, maxLength) {
  const normalized = value?.trim?.() || "";
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1)}...`;
}

function DetailItem({ label, value, href }) {
  return (
    <div className="admin-detail-item">
      <span>{label}</span>
      {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
    </div>
  );
}
