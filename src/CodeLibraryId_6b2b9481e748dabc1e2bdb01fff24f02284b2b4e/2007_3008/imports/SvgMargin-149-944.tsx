import svgPaths from "./svg-4cizzkdugw";

function Component10() {
  return (
    <div className="relative shrink-0 size-8" data-name="Component 10">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Component 10">
          <mask
            height="32"
            id="mask0_149_695"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="32"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="32"
              id="Bounding box"
              width="32"
            />
          </mask>
          <g mask="url(#mask0_149_695)">
            <path
              d={svgPaths.p12f2cb00}
              fill="var(--fill-0, #020817)"
              id="play_arrow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function SvgMargin() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="SVG:margin"
    >
      <Component10 />
    </div>
  );
}