import trustConfidenceVideo from "../../assets/plateau-trust-confidence-message.mp4";
import drFishInterviewRecapVideo from "../../assets/dr-fish-fm-interview-recap.mp4";
import kefasPortraitImage from "../../assets/kefas-2026-stonereporters-form.jpg";
import foundationThumbImage from "../../assets/kefiano-foundation-video-thumb.jpg";
import drFishInterviewPosterImage from "../../assets/dr-fish-fm-interview-poster.jpg";

export const videoFeedItems = [
  {
    id: "trust-confidence",
    src: trustConfidenceVideo,
    poster: kefasPortraitImage,
    title: "Message to Plateau",
  },
  {
    id: "dr-fish-interview",
    src: drFishInterviewRecapVideo,
    poster: drFishInterviewPosterImage,
    startAt: 8,
    title: "Dr Fish FM Interview",
    badgeSrc: "/decorative/kefiano4gov-pledge.png",
  },
];
