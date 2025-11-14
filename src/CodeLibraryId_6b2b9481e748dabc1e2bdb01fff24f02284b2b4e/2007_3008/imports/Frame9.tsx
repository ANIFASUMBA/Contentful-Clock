import svgPaths from "./svg-bgf6dn7pxi";

function SentimentCalm() {
  return (
    <div
      className="relative shrink-0 size-[18.126px]"
      data-name="sentiment_calm"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 19 19"
      >
        <g id="sentiment_calm">
          <mask
            height="19"
            id="mask0_8_850"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="19"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="18.1264"
              id="Bounding box"
              width="18.1264"
            />
          </mask>
          <g mask="url(#mask0_8_850)">
            <path
              d={svgPaths.pebd3200}
              fill="var(--fill-0, white)"
              id="sentiment_calm_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Frame9() {
  return (
    <div className="relative rounded-[5.57734px] size-full">
      <div className="absolute border-[#ffffff] border-[1.39434px] border-solid inset-[-0.697px] pointer-events-none rounded-[6.27451px]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[2.231px] items-center justify-start p-[5.57734px] relative size-full">
          <SentimentCalm />
          <div
            className="css-lllcyn flex flex-col font-['Roboto_Flex:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[17.8475px] text-left text-nowrap tracking-[-0.0793805px]"
            style={{
              fontVariationSettings:
                "'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712, 'wdth' 100",
            }}
          >
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
              Contentful Clock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}