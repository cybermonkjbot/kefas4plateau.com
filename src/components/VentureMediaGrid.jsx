export function VentureMediaGrid({ items }) {
  return (
    <div className="venture-media-grid">
      {items.map((item) => (
        <a
          className="venture-media-item"
          href={item.href}
          key={item.title}
          rel="noreferrer"
          target="_blank"
        >
          <div className="venture-media-frame">
            <img
              className={`venture-media-image ${item.imageClassName || ""}`.trim()}
              src={item.image}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="venture-media-copy">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
