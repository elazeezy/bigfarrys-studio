// src/components/home/HomeShell.jsx
export default function HomeShell({ children }) {
  return (
    <div
      className={[
        // Let home be its own smooth scroll container
        "h-[calc(100dvh-96px)] md:h-[calc(100dvh-32px)]",
        "overflow-y-auto",
        "scroll-smooth",

        // ✅ Soft snap (doesn't fight user)
        "snap-y snap-proximity",

        // Hide scrollbar
        "[scrollbar-width:none] [-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",

        // Make scroll feel nicer
        "overscroll-contain",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
