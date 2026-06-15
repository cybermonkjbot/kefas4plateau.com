export function LandscapeVisual() {
  return (
    <div className="visual visual--landscape" aria-hidden="true">
      <div className="portrait-panel">
        <span>Portrait</span>
      </div>
    </div>
  );
}

export function HospitalVisual() {
  return <div className="visual visual--hospital" aria-hidden="true" />;
}

export function TrainingVisual() {
  return <div className="visual visual--training" aria-hidden="true" />;
}
