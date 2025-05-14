import Link from "next/link";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "light" | "dark";
}

export function Logo({ size = "medium", variant = "dark" }: LogoProps) {
  const sizeClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  const sizeSvgClasses = {
    small: "h-7 w-7",
    medium: "h-9 w-9",
    large: "h-11 w-11",
  };

  const colorClasses = {
    light: "text-white",
    dark: "text-primary",
  };

  const primaryColor = variant === "light" ? "white" : "#0C7A3D";
  const secondaryColor =
    variant === "light" ? "rgba(255, 255, 255, 0.9)" : "#46B96F";
  const accentColor = variant === "light" ? "#FFFFFF" : "#A0E4B8";

  return (
    <Link href="/">
      <div className="group flex cursor-pointer items-center space-x-2">
        <div className={`${sizeSvgClasses[size]} relative`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-full w-full drop-shadow-sm filter transition-transform duration-300 ease-in-out group-hover:scale-105"
          >
            {/* Background circle with gradient */}
            <defs>
              <linearGradient
                id={`logo-gradient-${variant}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={primaryColor}
                  stopOpacity="0.1"
                />
                <stop
                  offset="100%"
                  stopColor={secondaryColor}
                  stopOpacity="0.3"
                />
              </linearGradient>
              <filter
                id="shadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="2"
                />
                <feOffset
                  dx="0"
                  dy="1"
                  result="offsetblur"
                />
                <feComponentTransfer>
                  <feFuncA
                    type="linear"
                    slope="0.2"
                  />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="50"
              cy="50"
              r="48"
              fill={`url(#logo-gradient-${variant})`}
            />

            {/* Leaf designs with animation */}
            <g className="transform-origin-center">
              <path
                d="M50,30 C40,50 60,50 50,70 C60,50 40,50 50,30 Z"
                fill={primaryColor}
                fillOpacity="0.9"
                stroke={secondaryColor}
                strokeWidth="1"
              />
              <path
                d="M30,50 C50,40 50,60 70,50 C50,60 50,40 30,50 Z"
                fill={primaryColor}
                fillOpacity="0.9"
                stroke={secondaryColor}
                strokeWidth="1"
              />

              {/* Accent dots */}
              <circle
                cx="50"
                cy="50"
                r="4"
                fill={accentColor}
              />
              <circle
                cx="50"
                cy="38"
                r="2"
                fill={accentColor}
                opacity="0.7"
              />
              <circle
                cx="50"
                cy="62"
                r="2"
                fill={accentColor}
                opacity="0.7"
              />
              <circle
                cx="38"
                cy="50"
                r="2"
                fill={accentColor}
                opacity="0.7"
              />
              <circle
                cx="62"
                cy="50"
                r="2"
                fill={accentColor}
                opacity="0.7"
              />
            </g>
          </svg>
        </div>
        <div
          className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} tracking-tight transition-all duration-300 ease-in-out group-hover:tracking-normal`}
        >
          Seed<span className="text-green-500">Bloom</span>
        </div>
      </div>
    </Link>
  );
}
