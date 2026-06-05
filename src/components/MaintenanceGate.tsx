import { useEffect, useState, type ReactNode } from "react";
import Logo from "./brand/Logo";

const PREVIEW_TOKEN = "jatkoturva2025";

function isLovablePreview(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.includes("lovable");
}

function readPreviewAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem("preview_access") === "true";
  } catch {
    return false;
  }
}

function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#111827" }}>
      <div className="flex flex-col items-center text-center">
        <Logo variant="full" theme="dark" tagline size={64} />

        <h1 className="text-white font-bold mt-10" style={{ fontSize: "48px", lineHeight: 1.1 }}>
          Tulossa pian
        </h1>

        <p className="mt-4 max-w-md" style={{ fontSize: "18px", color: "#94A3B8", lineHeight: 1.5 }}>
          Rakennamme parasta mahdollista palvelua sinulle. Palaamme pian!
        </p>

        <span
          className="mt-10 text-5xl font-light select-none"
          style={{
            backgroundImage: "linear-gradient(90deg, #6A3DF0, #FF4D9D)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          <span className="inline-block animate-pulse">&#8734;</span>
        </span>

        <p className="mt-16" style={{ fontSize: "14px", color: "#4B5563" }}>
          &copy; 2025 Jatkoturva &ndash; Turvaa jatkuvuutesi
        </p>
      </div>
    </div>
  );
}

interface MaintenanceGateProps {
  children: ReactNode;
}

export default function MaintenanceGate({ children }: MaintenanceGateProps) {
  const [hasPreviewAccess, setHasPreviewAccess] = useState<boolean>(readPreviewAccess);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === PREVIEW_TOKEN) {
      try {
        window.sessionStorage.setItem("preview_access", "true");
      } catch {
        /* ignore */
      }
      setHasPreviewAccess(true);
    }
  }, []);

  const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  if (maintenanceMode && !hasPreviewAccess && !isLovablePreview()) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}
