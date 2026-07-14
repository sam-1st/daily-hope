"use client";

import { useState } from "react";
import { Heart, Facebook, MessageCircle } from "lucide-react";
import { useToast } from "./Toast";

export default function ShareAndLike({ slug, title, initialLikes }: { slug: string; title: string; initialLikes: number }) {
  const { notify } = useToast();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
    try {
      await fetch(`/api/encouragements/${slug}/like`, { method: "POST" });
    } catch {
      // Non-critical — keep the optimistic UI even if the network call fails.
    }
  }

  function shareUrl() {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  function shareTo(platform: "whatsapp" | "facebook" | "x") {
    const url = encodeURIComponent(shareUrl());
    const text = encodeURIComponent(title);
    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleLike}
        aria-pressed={liked}
        className={
          "btn " +
          (liked
            ? "bg-red-50 text-red-600"
            : "border border-black/10 text-ink-soft hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10")
        }
      >
        <Heart size={16} fill={liked ? "currentColor" : "none"} />
        {likes}
      </button>

      <div className="flex items-center gap-2">
        <button onClick={() => shareTo("whatsapp")} aria-label="Share on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink-soft hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
          <MessageCircle size={16} />
        </button>
        <button onClick={() => shareTo("facebook")} aria-label="Share on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink-soft hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
          <Facebook size={16} />
        </button>
        <button
          onClick={() => shareTo("x")}
          aria-label="Share on X"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink-soft hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
        >
          <span className="text-xs font-bold">X</span>
        </button>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(shareUrl());
            notify("Link copied to clipboard.");
          }}
          className="text-xs font-medium text-ink-soft underline-offset-2 hover:underline"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}
