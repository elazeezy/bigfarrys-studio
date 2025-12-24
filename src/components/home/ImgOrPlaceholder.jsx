// src/components/home/ImgOrPlaceholder.jsx
import { useState } from "react";

export default function ImgOrPlaceholder({
  src,
  alt = "",
  className = "",
  rounded = "rounded-3xl",
}) {
  const [ok, setOk] = useState(true);

  if (!src) {
    return (
      <div
        className={[
          "border border-white/10 bg-white/5",
          rounded,
          "relative overflow-hidden",
          className,
        ].join(" ")}
      >
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.25),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(0,140,255,0.22),transparent_55%)]" />
      </div>
    );
  }

  return ok ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={[rounded, "border border-white/10 object-cover", className].join(" ")}
    />
  ) : (
    <div
      className={[
        "border border-white/10 bg-white/5",
        rounded,
        "relative overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.25),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(0,140,255,0.22),transparent_55%)]" />
    </div>
  );
}

