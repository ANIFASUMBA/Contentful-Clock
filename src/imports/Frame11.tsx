import svgPaths from "./svg-wrlpobapsl";

function SkipPrevious() {
  return (
    <div className="relative shrink-0 size-8" data-name="skip_previous">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="skip_previous">
          <mask
            height="32"
            id="mask0_149_628"
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
          <g mask="url(#mask0_149_628)">
            <path
              d={svgPaths.p1b2b3100}
              fill="var(--fill-0, #020817)"
              id="skip_previous_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

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
            id="mask0_149_612"
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
          <g mask="url(#mask0_149_612)">
            <path
              d={svgPaths.p20bd5100}
              fill="var(--fill-0, #020817)"
              id="pause"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SvgMargin() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-8 items-start justify-start p-0 relative shrink-0"
      data-name="SVG:margin"
    >
      <Component10 />
    </div>
  );
}

function SkipNext() {
  return (
    <div className="relative shrink-0 size-8" data-name="skip_next">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="skip_next">
          <mask
            height="32"
            id="mask0_149_616"
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
          <g mask="url(#mask0_149_616)">
            <path
              d={svgPaths.p20f12980}
              fill="var(--fill-0, #020817)"
              id="skip_next_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
      <SkipPrevious />
      <SvgMargin />
      <SkipNext />
    </div>
  );
}

function Person() {
  return (
    <div className="relative shrink-0 size-10" data-name="person">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        <g clipPath="url(#clip0_149_608)" id="person">
          <mask
            height="40"
            id="mask0_149_608"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="40"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="40"
              id="Bounding box"
              width="40"
            />
          </mask>
          <g mask="url(#mask0_149_608)">
            <path
              d={svgPaths.p2a914900}
              fill="var(--fill-0, #020817)"
              id="person_2"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_149_608">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Frame11() {
  return (
    <div className="bg-slate-50 relative rounded-xl size-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-6 items-center justify-start overflow-clip px-6 py-4 relative size-full">
          <Frame1 />
          <div className="flex flex-row items-center self-stretch">
            <div className="bg-[rgba(0,0,0,0.5)] h-full opacity-25 shrink-0 w-px" />
          </div>
          <Person />
        </div>
      </div>
      <div className="absolute border border-slate-50 border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}