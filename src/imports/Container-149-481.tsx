import svgPaths from "./svg-x788y0ihop";
import img502C376BFa9B4153B1436D6Fbfb1B98APng from "figma:asset/8b304557205b49836ee3bc5612dc4c0a3ee437da.png";
import imgVideoByTomFisk from "figma:asset/594a4e824975e7c3a04805f5ffc276da1641891a.png";

function Component1() {
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
            d={svgPaths.p203476e0}
            id="Vector"
            stroke="var(--stroke-0, #F8FAFC)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M12.6667 8H3.33333"
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
      className="box-border content-stretch flex flex-row items-center justify-center px-2.5 py-2 relative rounded-lg shrink-0"
      data-name="Component 2"
    >
      <Component1 />
    </div>
  );
}

function Heading1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 1"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-left text-slate-50 w-full">
        <p className="block leading-[28px]">@Jacquesd1</p>
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
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-slate-400 w-full">
        <p className="block leading-[24px]">jdebdesign@gmail.com</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-20 p-0 right-[52px] top-1/2 translate-y-[-50%]"
      data-name="Container"
    >
      <Heading1 />
      <Container />
    </div>
  );
}

function Component9() {
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
            d={svgPaths.p1ba32a00}
            id="Vector"
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

function Component11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[534px] px-2.5 py-2 rounded-lg top-1/2 translate-y-[-50%]"
      data-name="Component 2"
    >
      <Component9 />
    </div>
  );
}

function Component502C376BFa9B4153B1436D6Fbfb1B98APng() {
  return (
    <div
      className="[background-size:100%_114.63%] basis-0 bg-left bg-no-repeat grow h-full max-w-16 min-h-px min-w-px shrink-0"
      data-name="502c376b-fa9b-4153-b143-6d6fbfb1b98a.png"
      style={{
        backgroundImage: `url('${img502C376BFa9B4153B1436D6Fbfb1B98APng}')`,
      }}
    />
  );
}

function Border() {
  return (
    <div
      className="relative rounded-[9999px] shrink-0 size-16"
      data-name="Border"
    >
      <div className="box-border content-stretch flex flex-row items-start justify-center overflow-clip p-[2px] relative size-16">
        <Component502C376BFa9B4153B1436D6Fbfb1B98APng />
      </div>
      <div className="absolute border-2 border-[#020817] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-1/2 translate-y-[-50%]"
      data-name="Container"
    >
      <Border />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Container"
    >
      <Container1 />
      <Component11 />
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Component2 />
      <Container3 />
    </div>
  );
}

function Background() {
  return (
    <div
      className="bg-gradient-to-r from-[#f8fafc1a] relative shrink-0 to-[#f8fafc0d] w-full"
      data-name="Background"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[24px] relative w-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Component12() {
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
            d={svgPaths.p19d57600}
            id="Vector"
            stroke="var(--stroke-0, #F8FAFC)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p2fe1fe40}
            id="Vector_2"
            stroke="var(--stroke-0, #F8FAFC)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p2c494540}
            id="Vector_3"
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

function Component4() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0"
      data-name="Component 4"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-[50.7px] py-2 relative w-full">
          <Component12 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
            <p className="block leading-[20px] whitespace-pre">Background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component14() {
  return (
    <div className="relative shrink-0 size-4" data-name="Component 1">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 1">
          <mask
            height="16"
            id="mask0_149_506"
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
          <g mask="url(#mask0_149_506)">
            <path
              d={svgPaths.p1aaf1700}
              fill="var(--fill-0, #F8FAFC)"
              id="music_note"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component3() {
  return (
    <div
      className="basis-0 bg-[#020817] grow min-h-px min-w-px relative rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0"
      data-name="Component 3"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-[50.7px] py-2 relative w-full">
          <Component14 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
            <p className="block leading-[20px] whitespace-pre">Music</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component15() {
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
            d={svgPaths.p14548f00}
            id="Vector"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p17781bc0}
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

function Component16() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Component 3"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center pl-[62.06px] pr-[62.05px] py-2 relative w-full">
          <Component15 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-400">
            <p className="block leading-[20px] whitespace-pre">Location</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component17() {
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
            d={svgPaths.p399eca00}
            id="Vector"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.pc93b400}
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

function Component18() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Component 3"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center pl-[69.02px] pr-[69.01px] py-2 relative w-full">
          <Component17 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-400">
            <p className="block leading-[20px] whitespace-pre">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div
      className="bg-slate-800 relative rounded-[10px] shrink-0 w-full"
      data-name="Background"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[4px] relative w-full">
          <Component4 />
          <Component3 />
          <Component16 />
          <Component18 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div className="absolute border-[0px_0px_1px] border-slate-800 border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start pb-[17px] pt-4 px-6 relative w-full">
          <Background1 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-left text-nowrap text-slate-50">
        <p className="block leading-[28px] whitespace-pre">Music Settings</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-slate-400 w-full">
        <p className="block leading-[20px]">
          Customize your homepage music with songs or playlists from Spotify.
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading3 />
      <Container5 />
    </div>
  );
}

function Heading4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-nowrap text-slate-50">
        <p className="block leading-[24px] whitespace-pre">Volume</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-slate-400">
        <p className="block leading-[20px] whitespace-pre">
          Adjust playback volume
        </p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading4 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-slate-400">
        <p className="block leading-[20px] whitespace-pre">15%</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container8 />
      <Container9 />
    </div>
  );
}

function Component19() {
  return (
    <div
      className="absolute left-0 size-4 top-1/2 translate-y-[-50%]"
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
            d={svgPaths.p39ac0980}
            id="Vector"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M14.6667 6L10.6667 10"
            id="Vector_2"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M10.6667 6L14.6667 10"
            id="Vector_3"
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

function Component20() {
  return (
    <div
      className="absolute left-[412px] size-4 top-1/2 translate-y-[-50%]"
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
            d={svgPaths.p39ac0980}
            id="Vector"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p33554180}
            id="Vector_2"
            stroke="var(--stroke-0, #94A3B8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p30a38f00}
            id="Vector_3"
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

function Background2() {
  return (
    <div
      className="basis-0 bg-slate-800 grow h-4 min-h-px min-w-px overflow-clip relative rounded-[9999px] shrink-0"
      data-name="Background"
    >
      <div
        className="absolute bg-slate-50 bottom-0 left-0 right-[85%] top-0"
        data-name="Background"
      />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-7 p-0 right-7 top-1/2 translate-y-[-50%]"
      data-name="Container"
    >
      <Background2 />
      <div
        className="absolute bg-[#020817] left-[53.4px] rounded-[9999px] size-4 top-0"
        data-name="Slider"
      >
        <div className="absolute border border-slate-50 border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-4 relative shrink-0 w-full" data-name="Container">
      <Component19 />
      <Component20 />
      <Container11 />
    </div>
  );
}

function OverlayBorder() {
  return (
    <div
      className="bg-[rgba(30,41,59,0.3)] relative rounded-[10px] shrink-0 w-full"
      data-name="Overlay+Border"
    >
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[17px] relative w-full">
          <Container10 />
          <Container12 />
        </div>
      </div>
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

function Background3() {
  return (
    <div
      className="bg-slate-800 box-border content-stretch flex flex-col items-start justify-center overflow-clip p-0 relative rounded-[10px] shrink-0 size-16"
      data-name="Background"
    >
      <VideoByTomFisk />
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
        <p className="block leading-[24px]">Walking on a Dream</p>
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
        <p className="block leading-[20px]">by Empire of the Sun</p>
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
            id="mask0_149_528"
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
          <g mask="url(#mask0_149_528)">
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
            id="mask0_149_493"
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
          <g mask="url(#mask0_149_493)">
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
            id="mask0_149_489"
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
          <g mask="url(#mask0_149_489)">
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

function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
      <Component6 />
      <Component7 />
      <Component8 />
    </div>
  );
}

function Container16() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background3 />
      <Container15 />
      <Frame1 />
    </div>
  );
}

function Songs() {
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

function Component13() {
  return (
    <div className="relative shrink-0 size-4" data-name="Component 13">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 13">
          <mask
            height="16"
            id="mask0_149_532"
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
          <g mask="url(#mask0_149_532)">
            <path
              d={svgPaths.p1aaf1700}
              fill="var(--fill-0, #020817)"
              id="music_note"
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
      <Component13 />
    </div>
  );
}

function Component21() {
  return (
    <div
      className="bg-slate-50 h-9 relative rounded-lg shrink-0 w-full"
      data-name="Component 4"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-9 items-center justify-center px-3 py-2 relative w-full">
          <SvgMargin1 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#020817] text-[14px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">Change Song</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="relative shrink-0 size-4" data-name="Component 13">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Component 13">
          <mask
            height="16"
            id="mask0_149_524"
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
          <g mask="url(#mask0_149_524)">
            <path
              d={svgPaths.p1e1f9100}
              fill="var(--fill-0, #F8FAFC)"
              id="move_item"
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
      <Component22 />
    </div>
  );
}

function Component5() {
  return (
    <div
      className="bg-slate-800 h-9 relative rounded-lg shrink-0 w-full"
      data-name="Component 5"
    >
      <div className="absolute border border-[rgba(148,163,184,0.25)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-9 items-center justify-center px-[25px] py-4 relative w-full">
          <SvgMargin2 />
          <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-slate-50">
            <p className="block leading-[20px] whitespace-pre">
              Sign Out of Spotify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start pb-0 pt-6 px-0 relative shrink-0 w-[622px]"
      data-name="Container"
    >
      <Container6 />
      <OverlayBorder />
      <Songs />
      <Component21 />
      <div className="bg-[rgba(148,163,184,0.5)] h-px shrink-0 w-full" />
      <Component5 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div
      className="bg-[#020817] relative rounded-xl shrink-0 w-full"
      data-name="Background+Border"
    >
      <div className="flex flex-col items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start pb-[25px] pt-px px-px relative w-full">
          <Background />
          <HorizontalBorder />
          <Container17 />
        </div>
      </div>
      <div className="absolute border border-slate-800 border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

export default function Container18() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="Container"
    >
      <BackgroundBorder />
    </div>
  );
}