import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronUp, Pause, Play } from "lucide-react";
import { videoFeedItems } from "../data/videoFeed.js";
import { withBasePath } from "../lib/sitePaths.js";

export function WatchPage() {
  const feedRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActivePlaying, setIsActivePlaying] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [shareState, setShareState] = useState("idle");

  useEffect(() => {
    document.body.classList.add("watch-page-body");
    return () => document.body.classList.remove("watch-page-body");
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return undefined;

    const slides = Array.from(feed.querySelectorAll("[data-video-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visibleEntry) return;

        const nextIndex = Number(visibleEntry.target.getAttribute("data-index"));
        if (Number.isInteger(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        root: feed,
        threshold: [0.55, 0.75],
      },
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed || typeof window === "undefined") return undefined;

    const hashId = window.location.hash.replace(/^#/, "");
    if (!hashId) return undefined;

    const hashIndex = videoFeedItems.findIndex((item) => item.id === hashId);
    if (hashIndex < 0) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      feed.scrollTo({ top: hashIndex * window.innerHeight, behavior: "auto" });
      setActiveIndex(hashIndex);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    const activeItem = videoFeedItems[activeIndex];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index !== activeIndex) {
        video.pause();
      }
    });

    if (!activeVideo) {
      setIsActivePlaying(false);
      return;
    }

    const playActiveVideo = async () => {
      try {
        if (activeItem?.startAt && !activeVideo.dataset.initializedAt) {
          activeVideo.currentTime = activeItem.startAt;
          activeVideo.dataset.initializedAt = String(activeItem.startAt);
        }

        await activeVideo.play();
        setIsActivePlaying(true);
      } catch {
        setIsActivePlaying(false);
      }
    };

    playActiveVideo();
  }, [activeIndex]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return undefined;

    let hintDismissed = false;

    function dismissHint() {
      if (hintDismissed) return;
      hintDismissed = true;
      setShowScrollHint(false);
    }

    function handleScroll() {
      if (feed.scrollTop > 16) {
        dismissHint();
      }
    }

    const timeoutId = window.setTimeout(dismissHint, 2800);

    feed.addEventListener("scroll", handleScroll, { passive: true });
    feed.addEventListener("wheel", dismissHint, { passive: true });
    feed.addEventListener("touchstart", dismissHint, { passive: true });
    feed.addEventListener("pointerdown", dismissHint, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      feed.removeEventListener("scroll", handleScroll);
      feed.removeEventListener("wheel", dismissHint);
      feed.removeEventListener("touchstart", dismissHint);
      feed.removeEventListener("pointerdown", dismissHint);
    };
  }, []);

  useEffect(() => {
    const listeners = videoRefs.current.map((video, index) => {
      if (!video) return null;

      function handlePlay() {
        if (index === activeIndex) {
          setIsActivePlaying(true);
        }
      }

      function handlePause() {
        if (index === activeIndex) {
          setIsActivePlaying(false);
        }
      }

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return { handlePause, handlePlay, video };
    });

    return () => {
      listeners.forEach((entry) => {
        if (!entry) return;
        entry.video.removeEventListener("play", entry.handlePlay);
        entry.video.removeEventListener("pause", entry.handlePause);
      });
    };
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const activeItem = videoFeedItems[activeIndex];
    if (!activeItem) return undefined;

    const nextUrl = `${withBasePath("/watch")}#${activeItem.id}`;
    window.history.replaceState({}, "", nextUrl);

    return undefined;
  }, [activeIndex]);

  useEffect(() => {
    if (shareState === "idle") return undefined;

    const timeoutId = window.setTimeout(() => setShareState("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [shareState]);

  function togglePlayback() {
    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;

    if (activeVideo.paused) {
      activeVideo.play().then(
        () => setIsActivePlaying(true),
        () => setIsActivePlaying(false),
      );
      return;
    }

    activeVideo.pause();
    setIsActivePlaying(false);
  }

  function handlePlayerKeyDown(event) {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    togglePlayback();
  }

  function handleVideoLoadedMetadata(index) {
    const video = videoRefs.current[index];
    const item = videoFeedItems[index];
    if (!video || !item?.startAt || video.dataset.initializedAt) return;

    video.currentTime = item.startAt;
    video.dataset.initializedAt = String(item.startAt);
  }

  async function handleShare(event) {
    event.preventDefault();
    event.stopPropagation();

    const activeItem = videoFeedItems[activeIndex];
    if (!activeItem || typeof window === "undefined") return;

    const shareUrl = `${window.location.origin}${withBasePath("/watch")}#${activeItem.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: activeItem.title,
          url: shareUrl,
        });
        setShareState("shared");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      }
    } catch {
      setShareState("idle");
    }
  }

  return (
    <div className="watch-page">
      <a className="watch-back" href={withBasePath("/")} aria-label="Back to home">
        <ArrowLeft size={18} strokeWidth={2.4} />
        <span>Back</span>
      </a>
      <div className="watch-rail" aria-label="Video actions">
        <button
          className="watch-rail-action"
          type="button"
          aria-label={shareState === "idle" ? "Share clip" : "Clip link copied"}
          onClick={handleShare}
        >
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </button>
      </div>
      <div className={`watch-scroll-hint ${showScrollHint ? "is-visible" : ""}`} aria-hidden="true">
        <ChevronUp size={16} strokeWidth={2.4} />
        <span>Swipe up</span>
      </div>
      <div className="watch-feed" ref={feedRef}>
        {videoFeedItems.map((item, index) => (
          <section className="watch-slide" data-index={index} data-video-slide key={item.id}>
            <div
              className="watch-video-shell"
              aria-label={isActivePlaying && activeIndex === index ? "Pause video" : "Play video"}
              onClick={togglePlayback}
              onKeyDown={handlePlayerKeyDown}
              role="button"
              tabIndex={0}
            >
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                className="watch-video"
                onLoadedMetadata={() => handleVideoLoadedMetadata(index)}
                loop
                playsInline
                poster={item.poster}
                preload="metadata"
                src={item.src}
              />
              {item.badgeSrc ? (
                <img
                  className="watch-video-badge"
                  src={withBasePath(item.badgeSrc)}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                />
              ) : null}
              <span className={`watch-toggle ${isActivePlaying && activeIndex === index ? "is-playing" : ""}`} aria-hidden="true">
                {isActivePlaying && activeIndex === index ? (
                  <Pause size={28} strokeWidth={2.4} />
                ) : (
                  <Play size={28} strokeWidth={2.4} fill="currentColor" />
                )}
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
