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
      <linearGradient id="jt-brand-grad" x1="6" y1="6" x2="58" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6A3DF0" />
        <stop offset="100%" stopColor="#FF4D9D" />
      </linearGradient>
    </defs>
    {/* Shield outline (stroked, rounded) */}
    <path
      d="M32 4 L55 12.5 Q56.5 13 56.5 14.5 V32 C56.5 46.5 46 55.5 32.7 60 Q32 60.25 31.3 60 C18 55.5 7.5 46.5 7.5 32 V14.5 Q7.5 13 9 12.5 Z"
      fill="none"
      stroke="url(#jt-brand-grad)"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Stylized J (stroked) */}
    <path
      d="M40 17 V37 C40 43.075 35.075 48 29 48 C23.94 48 19.68 44.58 18.4 39.93"
      fill="none"
      stroke="url(#jt-brand-grad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M33.5 17 H44"
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
