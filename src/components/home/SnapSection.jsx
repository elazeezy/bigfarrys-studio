// src/components/home/SnapSection.jsx
export default function SnapSection({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={[
        "snap-start",
        // Better section height: not always full screen (collage can breathe)
        "min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-32px)]",
        "flex items-center",
        "relative",
        className,
      ].join(" ")}
    >
      <div className="w-full py-10 md:py-16">{children}</div>
    </section>
  );
}
