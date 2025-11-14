import svgPaths from "./svg-6xk1lb97z3";
import clsx from "clsx";
import imgImage1 from "figma:asset/6a0182a3c506cf166ac72d86be1756bdbff60cff.png";
type BackgroundImage46Props = {
  additionalClassNames?: string[];
};

function BackgroundImage46({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage46Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      {children}
    </div>
  );
}
type BackgroundImage30Props = {
  additionalClassNames?: string[];
};

function BackgroundImage30({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage30Props>) {
  return (
    <div
      className={clsx(
        "flex flex-row items-center relative size-full",
        additionalClassNames,
      )}
    >
      {children}
    </div>
  );
}

function BackgroundImage14({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage46 additionalClassNames={["size-10"]}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        {children}
      </svg>
    </BackgroundImage46>
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
        "css-fmijvv flex flex-col justify-center relative shrink-0",
        additionalClassNames,
      )}
    >
      <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre">
        {text}
      </p>
    </div>
  );
}

function Schedule() {
  return (
    <BackgroundImage14>
      <g clipPath="url(#clip0_6_75)" id="schedule">
        <mask
          height="40"
          id="mask0_6_75"
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
        <g mask="url(#mask0_6_75)">
          <path
            d={svgPaths.p2f193c20}
            fill="var(--fill-0, #1C1B1F)"
            id="schedule_2"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_6_75">
          <rect fill="white" height="40" width="40" />
        </clipPath>
      </defs>
    </BackgroundImage14>
  );
}

function Cloud() {
  return (
    <BackgroundImage14>
      <g clipPath="url(#clip0_6_71)" id="cloud">
        <mask
          height="40"
          id="mask0_6_71"
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
        <g mask="url(#mask0_6_71)">
          <path
            d={svgPaths.p2999c900}
            fill="var(--fill-0, #1C1B1F)"
            id="cloud_2"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_6_71">
          <rect fill="white" height="40" width="40" />
        </clipPath>
      </defs>
    </BackgroundImage14>
  );
}

function Bedtime() {
  return (
    <BackgroundImage14>
      <g clipPath="url(#clip0_6_63)" id="bedtime">
        <mask
          height="40"
          id="mask0_6_63"
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
        <g mask="url(#mask0_6_63)">
          <path
            d={svgPaths.p8ab870}
            fill="var(--fill-0, #1C1B1F)"
            id="bedtime_2"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_6_63">
          <rect fill="white" height="40" width="40" />
        </clipPath>
      </defs>
    </BackgroundImage14>
  );
}

function Frame3() {
  return (
    <BackgroundImage46>
      <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        <Bedtime />
      </div>
    </BackgroundImage46>
  );
}

function Person() {
  return (
    <BackgroundImage14>
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
    </BackgroundImage14>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#ffffff] bottom-16 left-1/2 rounded-xl translate-x-[-50%]">
      <BackgroundImage30 additionalClassNames={["overflow-clip"]}>
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start px-8 py-4 relative">
          <Schedule />
          <Cloud />
          <Frame3 />
          <div className="flex flex-row items-center self-stretch">
            <div className="bg-[#333333] h-full opacity-25 shrink-0 w-px" />
          </div>
          <Person />
        </div>
      </BackgroundImage30>
      <div className="absolute border border-neutral-200 border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div
      className="absolute shadow-[0px_0px_50px_0px_rgba(0,0,0,0.75)] translate-x-[-50%] translate-y-[-50%]"
      style={{ top: "calc(50% + 0.5px)", left: "calc(50% + 0.5px)" }}
    >
      <BackgroundImage30 additionalClassNames={["justify-center"]}>
        <div className="box-border content-stretch flex flex-row font-['Roboto:Light',_sans-serif] font-light gap-20 items-center justify-center leading-[0] p-[8px] relative text-[#ffffff] text-left text-nowrap tracking-[-0.25px]">
          <Frame4BackgroundImageAndText
            text="1:36 PM"
            additionalClassNames={["text-[200px]"]}
          />
          <Frame4BackgroundImageAndText
            text="•"
            additionalClassNames={["text-[100px]"]}
          />
          <Frame4BackgroundImageAndText
            text="78°"
            additionalClassNames={["text-[200px]"]}
          />
        </div>
      </BackgroundImage30>
    </div>
  );
}

export default function MacBookPro161() {
  return (
    <div
      className="bg-[#ffffff] relative size-full"
      data-name="MacBook Pro 16' - 1"
    >
      <div
        className="absolute bg-[50%_50%] bg-cover bg-no-repeat h-[1152px] left-1/2 top-[-71px] translate-x-[-50%] w-[1728px]"
        data-name="image 1"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
      <Frame1 />
      <Frame4 />
    </div>
  );
}