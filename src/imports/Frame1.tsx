import svgPaths from "./svg-gb2wprxdte";

function SkipPrevious() {
  return (
    <div className="relative shrink-0 size-4" data-name="skip_previous">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="skip_previous">
          <mask
            height="16"
            id="mask0_140_1321"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_140_1321)">
            <path
              d={svgPaths.p39d96380}
              fill="var(--fill-0, #F8FAFC)"
              id="skip_previous_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component6() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 6"
    >
      <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
      <SkipPrevious />
    </div>
  );
}

function Component10() {
  return (
    <div className="relative shrink-0 size-4" data-name="Component 10">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 10">
          <mask
            height="16"
            id="mask0_140_1317"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_140_1317)">
            <path
              d={svgPaths.p21029200}
              fill="var(--fill-0, #F8FAFC)"
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
      className="box-border content-stretch flex flex-col h-4 items-start justify-start p-0 relative shrink-0"
      data-name="SVG:margin"
    >
      <Component10 />
    </div>
  );
}

function Component7() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 7"
    >
      <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin />
    </div>
  );
}

function SkipNext() {
  return (
    <div className="relative shrink-0 size-4" data-name="skip_next">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="skip_next">
          <mask
            height="16"
            id="mask0_140_1325"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_140_1325)">
            <path
              d={svgPaths.p34ac4200}
              fill="var(--fill-0, #F8FAFC)"
              id="skip_next_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component8() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 8"
    >
      <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
      <SkipNext />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative size-full">
      <Component6 />
      <Component7 />
      <Component8 />
    </div>
  );
}