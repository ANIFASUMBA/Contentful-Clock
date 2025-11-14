import svgPaths from "./svg-ajp6m2d9k2";
import clsx from "clsx";
import imgImage1 from "figma:asset/6a0182a3c506cf166ac72d86be1756bdbff60cff.png";
type BackgroundImage15Props = {
  additionalClassNames?: string[];
};

function BackgroundImage15({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage15Props>) {
  return (
    <div
      className={clsx(
        "flex items-center relative size-full",
        additionalClassNames,
      )}
    >
      {children}
    </div>
  );
}
type Frame4BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string[];
};

function Frame4BackgroundImageAndText({
  text,
  additionalClassNames = [],
}: Frame4BackgroundImageAndTextProps) {
  return (
    <div
      style={{ fontVariationSettings: "'wdth' 100" }}
      className={clsx(
        "flex flex-col justify-center mb-[-9.109px] relative shrink-0",
        additionalClassNames,
      )}
    >
      <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre">
        {text}
      </p>
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

function Frame2() {
  return (
    <div
      className="absolute bg-[#ffffff] bottom-16 rounded-xl translate-x-[-50%]"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <BackgroundImage15 additionalClassNames={["flex-row", "overflow-clip"]}>
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-[16px] relative">
          <Person />
        </div>
      </BackgroundImage15>
      <div className="absolute border border-neutral-200 border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div
      className="absolute shadow-[0px_0px_56.9307px_0px_#000000] translate-x-[-50%] translate-y-[-50%]"
      style={{ top: "calc(50% + 0.5px)", left: "calc(50% + 0.5px)" }}
    >
      <BackgroundImage15 additionalClassNames={["flex-col", "justify-center"]}>
        <div className="box-border content-stretch flex flex-col font-['Roboto:Light',_sans-serif] font-light items-center justify-center leading-[0] pb-[18.218px] pt-[9.109px] px-[9.109px] relative text-[#ffffff] text-left text-nowrap tracking-[-0.284653px]">
          <Frame4BackgroundImageAndText
            text="1:36 PM"
            additionalClassNames={["css-6no9xm", "text-[91.0891px]"]}
          />
          <Frame4BackgroundImageAndText
            text="•"
            additionalClassNames={["css-6emcxh", "text-[56.9307px]"]}
          />
          <Frame4BackgroundImageAndText
            text="78°"
            additionalClassNames={["css-6no9xm", "text-[91.0891px]"]}
          />
        </div>
      </BackgroundImage15>
    </div>
  );
}

export default function MacBookPro169() {
  return (
    <div
      className="bg-[#ffffff] relative size-full"
      data-name="MacBook Pro 16' - 9"
    >
      <div
        className="absolute bg-[50%_50%] bg-cover bg-no-repeat h-[1152px] left-1/2 top-0 translate-x-[-50%] w-[1728px]"
        data-name="image 1"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
      <Frame2 />
      <Frame4 />
    </div>
  );
}