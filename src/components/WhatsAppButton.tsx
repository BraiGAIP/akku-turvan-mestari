const PHONE = "358401234567"; // placeholder — update to real number

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hei! Haluaisin lisätietoa Jatkoturvasta.")}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chatta kanssamme WhatsAppissa"
    className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 group flex items-center gap-3"
  >
    <span className="hidden md:inline-block px-3 py-1.5 rounded-full bg-background/90 backdrop-blur border border-border/60 text-xs font-bold text-foreground shadow-lg opacity-0 group-hover:opacity-100 transition">
      Chatta kanssamme
    </span>
    <span
      className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.74c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.63.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.12.28-.32.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.33 0 1.37 1 2.7 1.14 2.88.14.19 1.98 3.02 4.79 4.23.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.12-.26-.19-.54-.33zM16.02 4C9.92 4 4.97 8.95 4.97 15.05c0 1.95.51 3.85 1.48 5.52L4.86 26l5.6-1.47a11 11 0 0 0 5.56 1.5h.01c6.1 0 11.05-4.95 11.05-11.05 0-2.95-1.15-5.73-3.24-7.82A11 11 0 0 0 16.02 4z" />
      </svg>
    </span>
  </a>
);

export default WhatsAppButton;
