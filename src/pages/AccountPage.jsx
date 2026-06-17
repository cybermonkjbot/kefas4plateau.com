import { useEffect, useState } from "react";
import { KeyRound, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { withBasePath } from "../lib/sitePaths.js";

const accountSessionStorageKey = "kefas-account-session";
const accountPendingPassphraseStorageKey = "kefas-account-pending-passphrase";

export function AccountPage() {
  const [mode, setMode] = useState("register");
  const [account, setAccount] = useState(null);
  const [sessionState, setSessionState] = useState({ checking: true, working: false, error: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "" });
  const [loginForm, setLoginForm] = useState({ email: "", passphrase: "" });
  const [recoveryState, setRecoveryState] = useState({ passphrase: "", saved: false });

  useEffect(() => {
    document.body.classList.add("flow-page");
    return () => document.body.classList.remove("flow-page");
  }, []);

  useEffect(() => {
    let active = true;
    const sessionToken = readStoredSessionToken();
    const pendingPassphrase = readPendingPassphrase();

    if (pendingPassphrase) {
      setRecoveryState({ passphrase: pendingPassphrase, saved: false });
    }

    if (!sessionToken) {
      setSessionState({ checking: false, working: false, error: "" });
      return undefined;
    }

    verifySession(sessionToken)
      .then((nextAccount) => {
        if (!active) return;
        setAccount(nextAccount);
        setSessionState({ checking: false, working: false, error: "" });
      })
      .catch(() => {
        if (!active) return;
        clearStoredSessionToken();
        setSessionState({ checking: false, working: false, error: "" });
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleRegister(event) {
    event.preventDefault();
    if (sessionState.working) return;

    setSessionState((current) => ({ ...current, working: true, error: "" }));

    try {
      const response = await fetch("/api/accounts/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerForm),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "We couldn't create your account just now.");
      }

      storeSessionToken(payload.sessionToken);
      storePendingPassphrase(payload.passphrase);
      setAccount(payload.account);
      setLoginForm((current) => ({ ...current, email: payload.account.email }));
      setRecoveryState({ passphrase: payload.passphrase, saved: false });
      setSessionState({ checking: false, working: false, error: "" });
    } catch (error) {
      setSessionState({ checking: false, working: false, error: error.message || "We couldn't create your account just now." });
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (sessionState.working) return;

    setSessionState((current) => ({ ...current, working: true, error: "" }));

    try {
      const response = await fetch("/api/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "We couldn't sign you in just now.");
      }

      storeSessionToken(payload.sessionToken);
      setAccount(payload.account);
      setRecoveryState({ passphrase: "", saved: false });
      setSessionState({ checking: false, working: false, error: "" });
    } catch (error) {
      setSessionState({ checking: false, working: false, error: error.message || "We couldn't sign you in just now." });
    }
  }

  async function handleSignOut() {
    const sessionToken = readStoredSessionToken();

    setSessionState((current) => ({ ...current, working: true, error: "" }));

    try {
      if (sessionToken) {
        await fetch("/api/accounts/session", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }).catch(() => {});
      }
    } finally {
      clearStoredSessionToken();
      clearPendingPassphrase();
      setAccount(null);
      setRecoveryState({ passphrase: "", saved: false });
      setSessionState({ checking: false, working: false, error: "" });
    }
  }

  if (sessionState.checking) {
    return (
      <>
        <a className="flow-back" href={withBasePath("/")} aria-label="Back to home">
          Back
        </a>
        <main id="main">
          <section className="flow-screen account-screen">
            <div className="account-shell account-shell--centered">
              <div className="account-panel">
                <div className="account-heading">
                  <ShieldCheck aria-hidden="true" size={18} strokeWidth={2.2} />
                  <p>Checking this device</p>
                </div>
                <h1>Opening your account.</h1>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (recoveryState.passphrase) {
    const words = recoveryState.passphrase.split(" ");

    return (
      <>
        <a className="flow-back" href={withBasePath("/")} aria-label="Back to home">
          Back
        </a>
        <main id="main">
          <section className="flow-screen account-screen" aria-labelledby="account-passphrase-title">
            <div className="account-shell account-shell--stacked">
              <div className="account-panel account-panel--hero">
                <div className="account-heading">
                  <ShieldCheck aria-hidden="true" size={18} strokeWidth={2.2} />
                  <p>Save these 12 words now</p>
                </div>
                <h1 id="account-passphrase-title">This passphrase is the only way to recover your account.</h1>
                <p className="account-lead">
                  Keep it somewhere safe. This device stays signed in, but any other device will need these same 12 words to log in.
                </p>
              </div>

              <div className="account-panel">
                <div className="account-word-grid" aria-label="Recovery passphrase">
                  {words.map((word, index) => (
                    <div className="account-word-chip" key={`${word}-${index + 1}`}>
                      <span>{index + 1}</span>
                      <strong>{word}</strong>
                    </div>
                  ))}
                </div>

                <label className="account-check">
                  <input
                    checked={recoveryState.saved}
                    type="checkbox"
                    onChange={(event) =>
                      setRecoveryState((current) => ({
                        ...current,
                        saved: event.target.checked,
                      }))
                    }
                  />
                  <span>I’ve saved this passphrase somewhere safe.</span>
                </label>

                <div className="account-actions">
                  <button
                    className="flow-pill primary"
                    disabled={!recoveryState.saved}
                    type="button"
                    onClick={() => {
                      clearPendingPassphrase();
                      setRecoveryState({ passphrase: "", saved: false });
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (account) {
    return (
      <>
        <a className="flow-back" href={withBasePath("/")} aria-label="Back to home">
          Back
        </a>
        <main id="main">
          <section className="flow-screen account-screen" aria-labelledby="account-home-title">
            <div className="account-shell account-shell--stacked">
              <div className="account-panel account-panel--hero">
                <div className="account-heading">
                  <ShieldCheck aria-hidden="true" size={18} strokeWidth={2.2} />
                  <p>Signed in on this device</p>
                </div>
                <h1 id="account-home-title">{account.name}, your account is ready.</h1>
                <p className="account-lead">
                  This device can stay signed in. On any new device, log in with your email and your 12-word passphrase.
                </p>
              </div>

              <div className="account-panel account-panel--details">
                <div className="account-summary-row">
                  <span>Email</span>
                  <strong>{account.email}</strong>
                </div>
                <div className="account-summary-row">
                  <span>Recovery</span>
                  <strong>{account.recoveryWordCount}-word passphrase</strong>
                </div>
                <div className="account-summary-row">
                  <span>Last sign-in</span>
                  <strong>{formatDate(account.lastLoginAt || account.createdAt)}</strong>
                </div>

                <div className="account-inline-note">
                  If you sign out here, this device will need the passphrase the next time too.
                </div>

                <div className="account-actions">
                  <button className="flow-pill" disabled={sessionState.working} type="button" onClick={handleSignOut}>
                    {sessionState.working ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <a className="flow-back" href={withBasePath("/")} aria-label="Back to home">
        Back
      </a>
      <main id="main">
        <section className="flow-screen account-screen" aria-labelledby="account-title">
          <div className="account-shell">
            <div className="account-panel account-panel--hero">
              <div className="account-heading">
                <ShieldCheck aria-hidden="true" size={18} strokeWidth={2.2} />
                <p>Account access</p>
              </div>
              <h1 id="account-title">Create your account and keep the 12-word recovery passphrase.</h1>
              <p className="account-lead">
                You only need the passphrase on new devices or after signing out. The device you finish on can stay signed in.
              </p>
            </div>

            <div className="account-panel account-panel--auth">
              <div className="account-mode-toggle" role="tablist" aria-label="Account mode">
                <button
                  aria-selected={mode === "register"}
                  className={mode === "register" ? "is-active" : ""}
                  role="tab"
                  type="button"
                  onClick={() => setMode("register")}
                >
                  <UserPlus aria-hidden="true" size={16} strokeWidth={2.1} />
                  Create account
                </button>
                <button
                  aria-selected={mode === "login"}
                  className={mode === "login" ? "is-active" : ""}
                  role="tab"
                  type="button"
                  onClick={() => setMode("login")}
                >
                  <LogIn aria-hidden="true" size={16} strokeWidth={2.1} />
                  Log in
                </button>
              </div>

              {mode === "register" ? (
                <form className="account-form" onSubmit={handleRegister}>
                  <label className="account-field">
                    <span>Name</span>
                    <input
                      autoComplete="name"
                      placeholder="Your full name"
                      type="text"
                      value={registerForm.name}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="account-field">
                    <span>Email</span>
                    <input
                      autoComplete="email"
                      placeholder="you@example.com"
                      type="email"
                      value={registerForm.email}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <button className="flow-pill primary account-submit" disabled={sessionState.working} type="submit">
                    {sessionState.working ? "Creating..." : "Create account"}
                  </button>
                </form>
              ) : (
                <form className="account-form" onSubmit={handleLogin}>
                  <label className="account-field">
                    <span>Email</span>
                    <input
                      autoComplete="email"
                      placeholder="you@example.com"
                      type="email"
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="account-field">
                    <span>12-word passphrase</span>
                    <div className="account-passphrase-wrap">
                      <KeyRound aria-hidden="true" size={16} strokeWidth={2.2} />
                      <textarea
                        autoComplete="off"
                        placeholder="twelve words, in order"
                        rows="3"
                        value={loginForm.passphrase}
                        onChange={(event) =>
                          setLoginForm((current) => ({
                            ...current,
                            passphrase: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </label>
                  <button className="flow-pill primary account-submit" disabled={sessionState.working} type="submit">
                    {sessionState.working ? "Signing in..." : "Log in with passphrase"}
                  </button>
                </form>
              )}

              {sessionState.error ? (
                <p className="account-error" role="alert">
                  {sessionState.error}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

async function verifySession(sessionToken) {
  const response = await fetch("/api/accounts/session", {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Signed out");
  }

  const payload = await response.json().catch(() => ({}));
  return payload.account;
}

function storeSessionToken(sessionToken) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(accountSessionStorageKey, sessionToken);
}

function readStoredSessionToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(accountSessionStorageKey) || "";
}

function clearStoredSessionToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(accountSessionStorageKey);
}

function storePendingPassphrase(passphrase) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(accountPendingPassphraseStorageKey, passphrase);
}

function readPendingPassphrase() {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(accountPendingPassphraseStorageKey) || "";
}

function clearPendingPassphrase() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(accountPendingPassphraseStorageKey);
}

function formatDate(value) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
