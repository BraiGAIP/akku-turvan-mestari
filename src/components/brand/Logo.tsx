import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "symbol" | "wordmark";
  theme?: "light" | "dark"; // light = on light bg (dark text), dark = on dark bg (light text)
  tagline?: boolean;
  className?: string;
  size?: number; // symbol size in px
}

/**
 * JATKOTURVA brand logo.
 * - Symbol: shield containing a stylized "J" filled with the purple→pink brand gradient.
 * - Full: symbol + wordmark "JATKOTURVA" + optional tagline "TURVAA JATKUVUUTESI".
 *
 * Brand colors:
 *   Purple #6A3DF0, Pink #FF4D9D, Deep navy-charcoal #111827, Light #F2F4F7
 */
export const BrandShield = ({ className, size = 36 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="jt-brand-grad" x1="8" y1="6" x2="58" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6A3DF0" />
        <stop offset="100%" stopColor="#FF4D9D" />
      </linearGradient>
    </defs>
    {/* Shield outline */}
    <path
      d="M32 4 C32 4 44 9 56 12 C56 12 56 30 56 34 C56 47 45 56 32 60 C19 56 8 47 8 34 C8 30 8 12 8 12 C20 9 32 4 32 4 Z"
      fill="none"
      stroke="url(#jt-brand-grad)"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Stylized J */}
    <path
      d="M33 18 H43"
      stroke="url(#jt-brand-grad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M40 18 V37 C40 43 35 47 29 47 C23.5 47 19 43.5 18 38.5"
      fill="none"
      stroke="url(#jt-brand-grad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
);

const Logo = ({
  variant = "full",
  theme = "dark",
  tagline = true,
  className,
  size = 36,
}: LogoProps) => {
  const wordmarkColor = theme === "dark" ? "text-[#F2F4F7]" : "text-[#0A1220]";

  if (variant === "symbol") {
    return <BrandShield className={className} size={size} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {variant === "full" && <BrandShield size={size} />}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-black tracking-[0.04em] uppercase",
            wordmarkColor,
          )}
          style={{ fontSize: `${size * 0.5}px`, lineHeight: 1 }}
        >
          JATKOTURVA
        </span>
        {tagline && (
          <span
            className="font-bold uppercase tracking-[0.22em] mt-1 text-transparent bg-clip-text"
            style={{
              fontSize: `${Math.max(8, size * 0.22)}px`,
              backgroundImage: "linear-gradient(90deg, #6A3DF0, #FF4D9D)",
            }}
          >
            Turvaa jatkuvuutesi
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
