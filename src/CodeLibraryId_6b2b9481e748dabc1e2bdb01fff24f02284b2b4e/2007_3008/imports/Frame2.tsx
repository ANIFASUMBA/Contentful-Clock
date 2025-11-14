import svgPaths from "./svg-06cp7xavf2";
import clsx from "clsx";
type WrapperProps = {
  additionalClassNames?: string[];
};

function Wrapper({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative size-full", additionalClassNames)}>
      {children}
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
        <g clipPath="url(#clip0_6_55)" id="person">
          <mask
            height="40"
            id="mask0_6_55"
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
          <g mask="url(#mask0_6_55)">
            <path
              d={svgPaths.p2a914900}
              fill="var(--fill-0, #1C1B1F)"
              id="person_2"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_55">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Frame2() {
  return (
    <Wrapper additionalClassNames={["bg-[#ffffff]", "rounded-xl"]}>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start overflow-clip p-[16px] relative size-full">
          <Person />
        </div>
      </div>
      <div className="absolute border border-neutral-200 border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </Wrapper>
  );
}