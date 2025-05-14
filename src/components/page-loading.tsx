import { useId } from "react";

function PageLoading() {
  const id = useId();
  return (
    <div
      role="progressbar"
      className="flex size-full items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="animate-spin"
      >
        <defs>
          <linearGradient
            id={id}
            x1="20%"
            x2="50%"
            y1="60%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#009B3E"
            />
            <stop
              offset="25%"
              stopOpacity="75%"
              stopColor="#009B3E"
            />
            <stop
              offset="50%"
              stopOpacity="50%"
              stopColor="#009B3E"
            />
            <stop
              offset="75%"
              stopOpacity="25%"
              stopColor="#009B3E"
            />
            <stop
              offset="100%"
              stopOpacity="5%"
              stopColor="#009B3E"
            />
          </linearGradient>
        </defs>
        <g>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="transparent"
            stroke={`url(#${id})`}
            strokeWidth="4"
          />
        </g>
      </svg>
      <span className="sr-only">Page loading...</span>
    </div>
  );
}

export { PageLoading };
