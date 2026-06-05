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
      <linearGradient id="jt-brand-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6A3DF0" />
        <stop offset="100%" stopColor="#FF4D9D" />
      </linearGradient>
    </defs>
    {/* Shield silhouette */}
    <path
      d="M32 3 L57 12 V32 C57 47 46 56 32 61 C18 56 7 47 7 32 V12 Z"
      fill="url(#jt-brand-grad)"
    />
    {/* Stylized J cut-out */}
    <path
      d="M38 16 H44 V38 C44 45.732 37.732 52 30 52 C23.373 52 17.804 47.387 16.42 41.2 L22.28 39.8 C23.05 43.262 26.225 46 30 46 C34.418 46 38 42.418 38 38 Z"
      fill="#F2F4F7"
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
