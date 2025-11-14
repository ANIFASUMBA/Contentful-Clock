import svgPaths from "./svg-bqnoxbjcxp";
import imgVideoByTomFisk from "figma:asset/594a4e824975e7c3a04805f5ffc276da1641891a.png";
import imgVideoByTomFisk1 from "figma:asset/4a8d1257369642d06988b3d557c8b0473ae649cb.png";
import imgVideoByTomFisk2 from "figma:asset/ac83ed695586e2f5144f8a4769fa2d00fad3f700.png";
import imgVideoByTomFisk3 from "figma:asset/62e0251788c036ad6007a4e30a5523a8c1439c0f.png";
import imgVideoByTomFisk4 from "figma:asset/c94c6f923d16b57e46df900be64bd6ab585921af.png";

function Heading2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-left text-slate-50 w-full">
        <p className="block leading-[18px]">Choose Music</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">
          Current: Walking on a Dream by Empire of the Sun
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading2 />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="absolute bottom-[9.75px] box-border content-stretch flex flex-col items-start justify-start left-[41px] overflow-clip pl-0 pr-[302.52px] py-0 top-[9.75px]"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-slate-400">
        <p className="block leading-[normal] whitespace-pre">Search songs...</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="absolute bottom-[9.75px] left-[41px] top-[9.75px] w-[408px]"
      data-name="Container"
    />
  );
}

function Input() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] h-9 relative rounded-lg shrink-0 w-full"
      data-name="Input"
    >
      <div className="h-9 overflow-clip relative w-full">
        <Container2 />
        <Container3 />
      </div>
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function Component1() {
  return (
    <div
      className="absolute left-3 size-4 top-1/2 translate-y-[-50%]"
      data-name="Component 1"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 1">
          <path
            d={svgPaths.p107a080}
            id="Vector"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M14 14L11.1333 11.1333"
            id="Vector_2"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Component5() {
  return (
    <div
      className="absolute bg-slate-50 box-border content-stretch flex flex-row h-8 items-center justify-center px-3 py-0 right-[2.03px] rounded-lg top-1/2 translate-y-[-50%]"
      data-name="Component 5"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#020817] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Search</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Input />
      <Component1 />
      <Component5 />
    </div>
  );
}

function Margin() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pb-4 pt-0 px-0 relative shrink-0 w-full"
      data-name="Margin"
    >
      <Container4 />
    </div>
  );
}

function VideoByTomFisk() {
  return (
    <div
      className="basis-0 bg-center bg-cover bg-no-repeat grow max-w-16 min-h-px min-w-px shrink-0 w-full"
      data-name="Video by Tom Fisk"
      style={{ backgroundImage: `url('${imgVideoByTomFisk}')` }}
    />
  );
}

function Background() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-50 w-full">
        <p className="block leading-[24px]">Walking on a Dream</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">by Empire of the Sun</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container5 />
      <Container6 />
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
      className="box-border content-stretch flex flex-col h-4 items-start justify-start pl-0 pr-2 py-0 relative shrink-0 w-6"
      data-name="SVG:margin"
    >
      <Component10 />
    </div>
  );
}

function Component4() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 4"
    >
      <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Pause</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background />
      <Container7 />
      <Component4 />
    </div>
  );
}

function Songs() {
  return (
    <div
      className="bg-slate-800 relative rounded-xl shrink-0 w-full"
      data-name="Songs"
    >
      <div className="absolute border border-[rgba(148,163,184,0.5)] border-solid inset-0 pointer-events-none rounded-xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[25px] py-4 relative w-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function VideoByTomFisk1() {
  return (
    <div
      className="basis-0 bg-center bg-cover bg-no-repeat grow max-w-16 min-h-px min-w-px shrink-0 w-full"
      data-name="Video by Tom Fisk"
      style={{ backgroundImage: `url('${imgVideoByTomFisk1}')` }}
    />
  );
}

function Background1() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk1 />
    </div>
  );
}

function Container9() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-50 w-full">
        <p className="block leading-[24px]">Change</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">by J. Cole</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container9 />
      <Container10 />
    </div>
  );
}

function Component11() {
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
            id="mask0_140_1305"
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
          <g mask="url(#mask0_140_1305)">
            <path
              d={svgPaths.p286b900}
              fill="var(--fill-0, #F8FAFC)"
              id="play_arrow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SvgMargin1() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-4 items-start justify-start pl-0 pr-2 py-0 relative shrink-0 w-6"
      data-name="SVG:margin"
    >
      <Component11 />
    </div>
  );
}

function Component6() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 4"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin1 />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Play</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background1 />
      <Container11 />
      <Component6 />
    </div>
  );
}

function Songs1() {
  return (
    <div
      className="bg-[#020817] relative rounded-xl shrink-0 w-full"
      data-name="Songs"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[25px] py-4 relative w-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function VideoByTomFisk2() {
  return (
    <div
      className="basis-0 bg-center bg-cover bg-no-repeat grow max-w-16 min-h-px min-w-px shrink-0 w-full"
      data-name="Video by Tom Fisk"
      style={{ backgroundImage: `url('${imgVideoByTomFisk2}')` }}
    />
  );
}

function Background2() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk2 />
    </div>
  );
}

function Container13() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-50 w-full">
        <p className="block leading-[24px]">Island in the Sun</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">by Weezer</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container13 />
      <Container14 />
    </div>
  );
}

function Component12() {
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
            id="mask0_140_1305"
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
          <g mask="url(#mask0_140_1305)">
            <path
              d={svgPaths.p286b900}
              fill="var(--fill-0, #F8FAFC)"
              id="play_arrow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SvgMargin2() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-4 items-start justify-start pl-0 pr-2 py-0 relative shrink-0 w-6"
      data-name="SVG:margin"
    >
      <Component12 />
    </div>
  );
}

function Component7() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 4"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin2 />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Play</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background2 />
      <Container15 />
      <Component7 />
    </div>
  );
}

function Songs2() {
  return (
    <div
      className="bg-[#020817] relative rounded-xl shrink-0 w-full"
      data-name="Songs"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[25px] py-4 relative w-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function VideoByTomFisk3() {
  return (
    <div
      className="basis-0 bg-center bg-cover bg-no-repeat grow max-w-16 min-h-px min-w-px shrink-0 w-full"
      data-name="Video by Tom Fisk"
      style={{ backgroundImage: `url('${imgVideoByTomFisk3}')` }}
    />
  );
}

function Background3() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk3 />
    </div>
  );
}

function Container17() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-50 w-full">
        <p className="block leading-[24px]">Circles</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">by Mac Miller</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container17 />
      <Container18 />
    </div>
  );
}

function Component13() {
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
            id="mask0_140_1305"
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
          <g mask="url(#mask0_140_1305)">
            <path
              d={svgPaths.p286b900}
              fill="var(--fill-0, #F8FAFC)"
              id="play_arrow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SvgMargin3() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-4 items-start justify-start pl-0 pr-2 py-0 relative shrink-0 w-6"
      data-name="SVG:margin"
    >
      <Component13 />
    </div>
  );
}

function Component8() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 4"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin3 />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Play</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background3 />
      <Container19 />
      <Component8 />
    </div>
  );
}

function Songs3() {
  return (
    <div
      className="bg-[#020817] relative rounded-xl shrink-0 w-full"
      data-name="Songs"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[25px] py-4 relative w-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function VideoByTomFisk4() {
  return (
    <div
      className="basis-0 bg-center bg-cover bg-no-repeat grow max-w-16 min-h-px min-w-px shrink-0 w-full"
      data-name="Video by Tom Fisk"
      style={{ backgroundImage: `url('${imgVideoByTomFisk4}')` }}
    />
  );
}

function Background4() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk4 />
    </div>
  );
}

function Container21() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-50 w-full">
        <p className="block leading-[24px]">Mr. Brightside</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">by The Killers</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container21 />
      <Container22 />
    </div>
  );
}

function Component14() {
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
            id="mask0_140_1305"
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
          <g mask="url(#mask0_140_1305)">
            <path
              d={svgPaths.p286b900}
              fill="var(--fill-0, #F8FAFC)"
              id="play_arrow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SvgMargin4() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-4 items-start justify-start pl-0 pr-2 py-0 relative shrink-0 w-6"
      data-name="SVG:margin"
    >
      <Component14 />
    </div>
  );
}

function Component9() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0"
      data-name="Component 4"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
      <SvgMargin4 />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Play</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background4 />
      <Container23 />
      <Component9 />
    </div>
  );
}

function Songs4() {
  return (
    <div
      className="bg-[#020817] relative rounded-xl shrink-0 w-full"
      data-name="Songs"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[25px] py-4 relative w-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-[560.5px] items-start justify-start p-0 relative shrink-0 w-[462px]"
      data-name="Container"
    >
      <Songs />
      <Songs1 />
      <Songs2 />
      <Songs3 />
      <Songs4 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
      <Songs1 />
    </div>
  );
}

function Component45() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-9 items-center justify-center px-[17px] py-[9px] relative rounded-lg shrink-0 w-[446px]"
      data-name="Component 5"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
        <p className="block leading-[20px] whitespace-pre">Load More</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start pb-20 pl-0 pr-4 pt-4 relative w-full">
          <Component45 />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 min-w-[462px] p-0 top-0 w-[462px]"
      data-name="Container"
    >
      <Container85 />
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div
      className="h-[460px] overflow-x-clip overflow-y-auto relative shrink-0 w-full"
      data-name="Container"
    >
      <Container87 />
    </div>
  );
}

function Container89() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Margin />
      <Container88 />
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-4" data-name="Component 1">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 1">
          <path
            d="M12 4L4 12"
            id="Vector"
            stroke="var(--stroke-0, #F8FAFC)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M4 4L12 12"
            id="Vector_2"
            stroke="var(--stroke-0, #F8FAFC)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start opacity-70 p-0 right-[17px] top-[17px]"
      data-name="Component 2"
    >
      <Component3 />
    </div>
  );
}

export default function Dialog() {
  return (
    <div
      className="bg-[#020817] relative rounded-[10px] size-full"
      data-name="Dialog"
    >
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start max-w-inherit overflow-clip p-[25px] relative size-full">
          <Container1 />
          <Container89 />
          <Component2 />
        </div>
      </div>
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}