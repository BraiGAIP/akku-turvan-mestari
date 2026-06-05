import { Camera } from "lucide-react";

interface PhotoPlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  overlayOpacity?: number; // 0-1, dark overlay rgba(10,18,32,X)
  rounded?: string; // tailwind rounded class
  loading?: "lazy" | "eager";
  label?: string;
  showLabel?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}


/**
 * Image slot with gradient + camera-icon fallback when no `src` is provided.
 * When `src` is set, renders <img> with object-cover and an optional dark overlay.
 */
const PhotoPlaceholder = ({
  src,
  alt,
  className = "",
  overlayOpacity = 0,
  rounded = "",
  loading = "lazy",
  label = "Lisää kuva tähän",
  showLabel = true,
}: PhotoPlaceholderProps) => {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={
        !src
          ? { background: "linear-gradient(135deg, #1A2332, #2D3748)" }
          : undefined
      }
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
            <Camera className="w-8 h-8" strokeWidth={1.5} />
            <span className="text-xs font-medium tracking-wide">{label}</span>
          </div>
        )
      )}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: `rgba(10,18,32,${overlayOpacity})` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default PhotoPlaceholder;
