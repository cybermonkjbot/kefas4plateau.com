import { useEffect, useMemo, useRef, useState } from "react";
import {
  ageBands,
  availabilityOptions,
  focusOptions,
  roleOptions,
} from "../data/pledgeOptions.js";

export function PledgePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selfieData, setSelfieData] = useState("");
  const [cameraState, setCameraState] = useState("idle");
  const [cameraError, setCameraError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ageBand: "",
    role: "",
    focus: "",
    location: "",
    availability: "",
    note: "",
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("flow-page");
    return () => {
      document.body.classList.remove("flow-page");
      stopCamera();
    };
  }, []);

  const steps = [
    {
      key: "name",
      label: "What is your name?",
      control: (
        <input
          autoComplete="name"
          autoFocus
          placeholder="Your full name"
          type="text"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
      ),
      valid: Boolean(form.name.trim()),
    },
    {
      key: "email",
      label: "What email should we use?",
      control: (
        <input
          autoComplete="email"
          placeholder="you@example.com"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      ),
      valid: Boolean(form.email.trim()),
    },
    {
      key: "phone",
      label: "Want to add a phone number?",
      control: (
        <input
          autoComplete="tel"
          placeholder="Optional"
          type="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      ),
      valid: true,
    },
    {
      key: "ageBand",
      label: "Which age band fits you?",
      choice: true,
      control: (
        <div className="flow-choice-list" role="radiogroup" aria-label="Age band">
          {ageBands.map((band) => (
            <button
              aria-checked={form.ageBand === band}
              className="flow-choice-option"
              key={band}
              role="radio"
              type="button"
              onClick={() => updateField("ageBand", band)}
            >
              {band}
            </button>
          ))}
        </div>
      ),
      valid: Boolean(form.ageBand),
    },
    {
      key: "role",
      label: "How do you want to help?",
      choice: true,
      control: (
        <div className="flow-choice-list" role="radiogroup" aria-label="Pledge role">
          {roleOptions.map((option) => (
            <button
              aria-checked={form.role === option}
              className="flow-choice-option"
              key={option}
              role="radio"
              type="button"
              onClick={() => updateField("role", option)}
            >
              {option}
            </button>
          ))}
        </div>
      ),
      valid: Boolean(form.role),
    },
    {
      key: "focus",
      label: "Where should the energy go?",
      choice: true,
      control: (
        <div className="flow-choice-list" role="radiogroup" aria-label="Focus area">
          {focusOptions.map((option) => (
            <button
              aria-checked={form.focus === option}
              className="flow-choice-option"
              key={option}
              role="radio"
              type="button"
              onClick={() => updateField("focus", option)}
            >
              {option}
            </button>
          ))}
        </div>
      ),
      valid: Boolean(form.focus),
    },
    {
      key: "location",
      label: "Where are you based?",
      control: (
        <input
          autoComplete="address-level2"
          placeholder="City, area, or LGA"
          type="text"
          value={form.location}
          onChange={(event) => updateField("location", event.target.value)}
        />
      ),
      valid: Boolean(form.location.trim()),
    },
    {
      key: "availability",
      label: "When can you show up?",
      choice: true,
      control: (
        <div className="flow-choice-list" role="radiogroup" aria-label="Availability">
          {availabilityOptions.map((option) => (
            <button
              aria-checked={form.availability === option}
              className="flow-choice-option"
              key={option}
              role="radio"
              type="button"
              onClick={() => updateField("availability", option)}
            >
              {option}
            </button>
          ))}
        </div>
      ),
      valid: Boolean(form.availability),
    },
    {
      key: "note",
      label: "What should the team know?",
      control: (
        <textarea
          placeholder="Skills, ideas, networks, business, or support you can bring."
          rows="4"
          value={form.note}
          onChange={(event) => updateField("note", event.target.value)}
        />
      ),
      valid: Boolean(form.note.trim()),
    },
    {
      key: "selfie",
      label: "Add your pledge selfie",
      valid: true,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  const isSelfieStep = currentStep.key === "selfie";
  const firstName = useMemo(() => form.name.trim().split(/\s+/)[0] || "Friend", [form.name]);

  const confirmationLead = useMemo(() => {
    const role = form.role ? form.role.toLowerCase() : "supporter";
    const focus = form.focus ? form.focus.toLowerCase() : "youth opportunity";
    const location = form.location ? ` in ${form.location}` : "";
    return `${firstName}, your pledge is in. The team now knows you want to help${location} as a ${role} around ${focus}.`;
  }, [firstName, form.focus, form.location, form.role]);

  useEffect(() => {
    if (!isSelfieStep || selfieData) {
      stopCamera();
      return undefined;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState("unavailable");
      setCameraError("Camera access is not available here. You can still skip this step.");
      return undefined;
    }

    let active = true;

    async function startCamera() {
      setCameraState("requesting");
      setCameraError("");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch {}
        }

        setCameraState("ready");
      } catch {
        if (!active) return;
        setCameraState("error");
        setCameraError("Allow camera access to take a quick selfie, or skip for now.");
      }
    }

    startCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [isSelfieStep, selfieData]);

  function updateField(field, value) {
    setSubmitError("");
    setForm((current) => ({ ...current, [field]: value }));
  }

  function stopCamera() {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  async function submitPledge(selfieDataUrl = selfieData) {
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/pledges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          selfieDataUrl,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "We couldn't save your pledge just now.");
      }

      window.dispatchEvent(
        new CustomEvent("kefas-pledge-count-updated", {
          detail: { count: payload.count },
        }),
      );
      stopCamera();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || "We couldn't save your pledge just now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function goNext() {
    if (!currentStep.valid) return;
    if (isLastStep) {
      submitPledge();
      return;
    }

    setStep((current) => current + 1);
  }

  function goPrev() {
    setStep((current) => Math.max(0, current - 1));
  }

  async function captureSelfie() {
    if (cameraState !== "ready" || !videoRef.current || isSubmitting) return;

    const video = videoRef.current;
    const width = video.videoWidth || 1080;
    const height = video.videoHeight || 1440;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.translate(width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, width, height);

    const nextSelfieData = canvas.toDataURL("image/jpeg", 0.9);
    setSelfieData(nextSelfieData);
    await submitPledge(nextSelfieData);
  }

  if (submitted) {
    return (
      <>
        <a className="flow-back" href="/" aria-label="Back to home">
          Back
        </a>
        <main id="main">
          <section className="flow-screen flow-screen--success" aria-labelledby="pledge-success-title">
            <div className="flow-copy compact flow-success-shell">
              <p className="pledge-flow-kicker">Pledge received</p>
              <h1 id="pledge-success-title">Thank you, {firstName}.</h1>
              <p className="pledge-flow-lead">{confirmationLead}</p>
              <div className="pledge-flow-summary">
                <div className="pledge-flow-summary-item">
                  <strong>How you want to help</strong>
                  <p>{form.role}</p>
                </div>
                <div className="pledge-flow-summary-item">
                  <strong>Focus</strong>
                  <p>{form.focus}</p>
                </div>
                <div className="pledge-flow-summary-item">
                  <strong>Availability</strong>
                  <p>{form.availability}</p>
                </div>
              </div>
              {form.note ? <p className="pledge-flow-note">“{form.note}”</p> : null}
              {selfieData ? (
                <div className="pledge-flow-selfie-proof">
                  <img src={selfieData} alt={`${form.name} pledge selfie`} />
                  <span>Selfie added</span>
                </div>
              ) : null}
              <p className="pledge-flow-followup">
                We&apos;ll reach out at {form.email} when there&apos;s a strong place for you to plug in.
              </p>
              <div className="pledge-flow-actions">
                <a className="flow-pill primary" href="/">
                  Back home
                </a>
                <a className="flow-pill" href="/news">
                  See updates
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <a className="flow-back" href="/" aria-label="Back to home">
        Back
      </a>
      <main id="main">
        <section className="flow-screen flow-form-screen" aria-labelledby="pledge-form-title">
          <div className="flow-copy compact flow-only-label">
            <h1 id="pledge-form-title">Tell us where you fit.</h1>
          </div>

          <form className="join-form flow-form-panel" onSubmit={(event) => event.preventDefault()}>
            {isSelfieStep ? (
              <section className="flow-question flow-selfie-question" aria-label={currentStep.label}>
                <div className="flow-selfie-stage">
                  {selfieData ? (
                    <img className="flow-selfie-photo" src={selfieData} alt={`${form.name} selfie preview`} />
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      className="flow-selfie-video"
                      muted
                      playsInline
                    />
                  )}
                  <div className="flow-selfie-scrim" aria-hidden="true" />
                  <div className="flow-selfie-top">
                    <h1>Take a quick selfie.</h1>
                    <p>Put a face to your pledge, or skip and finish.</p>
                  </div>
                  <div className="flow-selfie-frame" aria-hidden="true" />
                  {cameraState !== "ready" ? (
                    <p className="flow-selfie-status" role="status">
                      {cameraState === "requesting"
                        ? "Opening camera..."
                        : cameraError || "Camera unavailable. You can skip this step."}
                    </p>
                  ) : null}
                  {submitError ? (
                    <p className="flow-selfie-status" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  <div className="flow-selfie-controls">
                    <div />
                    <button
                      aria-label="Take selfie"
                      className="flow-selfie-shutter"
                      disabled={cameraState !== "ready" || isSubmitting}
                      type="button"
                      onClick={captureSelfie}
                    >
                      <span />
                    </button>
                    <button className="flow-selfie-skip" disabled={isSubmitting} type="button" onClick={submitPledge}>
                      Skip
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className={`flow-question ${currentStep.choice ? "flow-choice-question" : ""}`}>
                <label>{currentStep.label}</label>
                {currentStep.control}
                <div className="flow-controls">
                  {step > 0 ? (
                    <button className="flow-pill" type="button" onClick={goPrev}>
                      Back
                    </button>
                  ) : null}
                  <button
                    className="flow-pill primary"
                    disabled={!currentStep.valid}
                    type="button"
                    onClick={goNext}
                  >
                    {isLastStep ? "Submit pledge" : "Next"}
                  </button>
                </div>
              </section>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
