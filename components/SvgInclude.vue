<script lang="ts">
export interface SvgNamesInterface {
  [index: string]: string;
}

export const SvgNames: SvgNamesInterface = {
  Waves: 'waves',
  Scroll: 'scroll',
  ScrollWhite: 'scrollWhite',
  JourneyPath: 'JourneyPath',
  JourneyPathMobile: 'JourneyPathMobile',
  SolarSystem: 'SolarSystem',
  Kroznica: 'kroznica',
  Edit: 'edit',
  Close: 'close',
  Checkmark: 'checkmark',
  Arrow: 'arrow',
  ArrowTriangle: 'arrowTriangle',
  PlanetIntrodus: 'planetIntrodus',
  PlanetAmalin: 'planetAmalin',
  PlanetTrios: 'planetTrios',
  PlanetOpushop: 'planetOpushop',
};
/**
 * Component for including inline svg, to keep html cleaner
 */
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
      validator: (val: string) => Object.values(SvgNames).includes(val),
    },
    fill: { type: String, default: '' },
  },

  setup() {
    return {
      SvgNames,
    };
  },
});
</script>

<template>
  <svg
    v-if="name === SvgNames.Scroll"
    class="scroll-down mx-auto block w-7"
    width="23"
    height="54"
    viewBox="0 0 23 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2_8)">
      <path
        class="path1"
        d="M11.6863 53.941L23 42.6274L0.372589 42.6274L11.6863 53.941Z"
        fill="black"
      />
      <path
        class="path2"
        d="M11.6863 32.6274L23 21.3137L0.372589 21.3137L11.6863 32.6274Z"
        fill="black"
      />
      <path
        class="path3"
        d="M11.6863 11.3137L23 1.99676e-06L0.372589 0L11.6863 11.3137Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_8">
        <rect width="23" height="54" fill="white" />
      </clipPath>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.ScrollWhite"
    class="scroll-down mx-auto block w-7"
    width="23"
    height="54"
    viewBox="0 0 23 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2_8)">
      <path
        class="path1"
        d="M11.6863 53.941L23 42.6274L0.372589 42.6274L11.6863 53.941Z"
        fill="white"
      />
      <path
        class="path2"
        d="M11.6863 32.6274L23 21.3137L0.372589 21.3137L11.6863 32.6274Z"
        fill="white"
      />
      <path
        class="path3"
        d="M11.6863 11.3137L23 1.99676e-06L0.372589 0L11.6863 11.3137Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_8">
        <rect width="23" height="54" fill="black" />
      </clipPath>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.Waves"
    width="1469"
    height="1021"
    viewBox="0 0 1469 1021"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.7">
      <path
        d="M-325 239.701C-325 239.701 -177.882 212.442 -139.924 117.039C-103.622 25.5834 45.9159 1 45.9159 1"
        stroke="url(#paint0_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 285.556C-325 285.556 -144.51 254.094 -98.0178 138.947C-53.6913 29.0225 129.601 1 129.601 1"
        stroke="url(#paint1_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 331.538C-325 331.538 -111.265 295.746 -56.2388 161.11C-3.76029 32.3342 213.287 1 213.287 1"
        stroke="url(#paint2_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 377.393C-325 377.393 -77.8926 337.397 -14.3325 183.019C46.1707 35.7734 296.972 1 296.972 1"
        stroke="url(#paint3_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 423.248C-325 423.248 -44.5203 379.049 27.5739 205.055C96.1017 39.2125 380.53 1 380.53 1"
        stroke="url(#paint4_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 469.23C-325 469.23 -11.2754 420.828 69.353 227.091C146.16 42.5243 464.215 1 464.215 1"
        stroke="url(#paint5_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 515.085C-325 515.085 22.0968 462.352 111.259 249.126C196.091 45.9634 547.901 1 547.901 1"
        stroke="url(#paint6_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 560.94C-325 560.94 55.4691 504.004 153.038 271.035C246.022 49.4025 631.586 1 631.586 1"
        stroke="url(#paint7_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 606.923C-325 606.923 88.7139 545.783 194.945 293.198C295.953 52.7142 715.144 1 715.144 1"
        stroke="url(#paint8_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 652.778C-325 652.778 122.086 587.434 236.724 315.234C345.884 56.1534 798.829 1 798.829 1"
        stroke="url(#paint9_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 698.76C-325 698.76 155.458 629.086 278.63 337.27C395.815 59.5925 882.515 1 882.515 1"
        stroke="url(#paint10_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 744.615C-325 744.615 188.703 670.738 320.409 359.306C445.746 62.9042 966.2 1 966.2 1"
        stroke="url(#paint11_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 790.47C-325 790.47 222.076 712.389 362.315 381.214C495.677 66.3434 1049.89 1 1049.89 1"
        stroke="url(#paint12_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 836.453C-325 836.453 255.448 754.041 404.222 403.378C545.608 69.7825 1133.44 1 1133.44 1"
        stroke="url(#paint13_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 882.307C-325 882.307 288.693 795.692 446.001 425.286C595.539 73.0942 1217.13 1 1217.13 1"
        stroke="url(#paint14_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 928.163C-325 928.163 322.065 837.344 487.907 447.322C645.47 76.5333 1300.81 1 1300.81 1"
        stroke="url(#paint15_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 974.145C-325 974.145 355.437 879.123 529.686 469.358C695.401 79.9725 1384.5 1 1384.5 1"
        stroke="url(#paint16_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
      <path
        d="M-325 1020C-325 1020 388.682 920.647 571.593 491.394C745.332 83.2842 1468.06 1 1468.06 1"
        stroke="url(#paint17_linear_523_287)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-dasharray="24 24"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_523_287"
        x1="-139.542"
        y1="1"
        x2="-139.542"
        y2="239.701"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_523_287"
        x1="-97.6994"
        y1="1"
        x2="-97.6994"
        y2="285.556"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_523_287"
        x1="-55.8567"
        y1="1"
        x2="-55.8567"
        y2="331.538"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_523_287"
        x1="-14.014"
        y1="1"
        x2="-14.014"
        y2="377.393"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_523_287"
        x1="27.765"
        y1="1"
        x2="27.765"
        y2="423.248"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_523_287"
        x1="69.6077"
        y1="1"
        x2="69.6077"
        y2="469.23"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_523_287"
        x1="111.45"
        y1="1"
        x2="111.45"
        y2="515.085"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_523_287"
        x1="153.293"
        y1="1"
        x2="153.293"
        y2="560.94"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_523_287"
        x1="195.072"
        y1="1"
        x2="195.072"
        y2="606.923"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_523_287"
        x1="236.915"
        y1="1"
        x2="236.915"
        y2="652.778"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint10_linear_523_287"
        x1="278.757"
        y1="1"
        x2="278.757"
        y2="698.76"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint11_linear_523_287"
        x1="320.6"
        y1="1"
        x2="320.6"
        y2="744.615"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint12_linear_523_287"
        x1="362.443"
        y1="1"
        x2="362.443"
        y2="790.47"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint13_linear_523_287"
        x1="404.222"
        y1="1"
        x2="404.222"
        y2="836.453"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint14_linear_523_287"
        x1="446.065"
        y1="1"
        x2="446.065"
        y2="882.307"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint15_linear_523_287"
        x1="487.907"
        y1="1"
        x2="487.907"
        y2="928.163"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint16_linear_523_287"
        x1="529.75"
        y1="1"
        x2="529.75"
        y2="974.145"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint17_linear_523_287"
        x1="571.529"
        y1="1"
        x2="571.529"
        y2="1020"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.479167" stop-color="#D18D21" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.JourneyPath"
    xmlns="http://www.w3.org/2000/svg"
    width="956"
    height="2301"
    viewBox="0 0 956 2301"
    fill="none"
  >
    <path
      d="M954.713 1.00006C808.501 116 354.5 255 232.213 326.5C119.232 392.559 -46.4727 573.5 14.2132 795C64.2139 977.5 401.879 1126.21 502.213 1281.5C580.713 1403 531.213 1730.5 297.213 1831C97.4397 1916.8 118.213 2162.5 297.213 2299.5"
      stroke="url(#paint0_linear_1390_856)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1390_856"
        x1="34.3437"
        y1="1493.75"
        x2="918.114"
        y2="1493.23"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.JourneyPathMobile"
    width="302"
    height="2988"
    viewBox="0 0 302 2988"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M301 1C215.642 118.025 126.179 220.87 53.2642 431.128C7.29229 563.694 -7.50036 864.5 7.29193 989.701C34.0187 1215.92 214.054 1360.48 250.976 1626.28C274.828 1797.98 125.094 2114.65 95.6699 2279.74C71.1297 2417.44 119.247 2816.41 175.147 2987"
      stroke="url(#paint0_linear_1663_2324)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1663_2324"
        x1="12.1585"
        y1="1940.25"
        x2="289.514"
        y2="1940.21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.SolarSystem"
    width="1920"
    height="758"
    viewBox="0 0 1680 758"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M295,420 C265,265 1250,190 1310,340 C1310,500 350,560 295,420"
      stroke="url(#paint2_linear_1501_263)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <path
      d="M152,425 C140,235 1370,130 1450,330 C1470,530 210,620 152,425"
      stroke="url(#paint1_linear_1501_263)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <path
      d="M16,435 C5,200 1505,80 1587,322 C1580,570 70,660 16,435"
      stroke="url(#paint0_linear_1501_263)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <path
      d="M-120,445 C-100,155 1610,45 1720,305 C1755,595 -40,720 -120,445"
      stroke="url(#paint3_linear_1501_263)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <path
      d="M-245,455 C-225,125 1720,0 1846,300 C1845,625 -100,780 -245,455"
      stroke="url(#paint4_linear_1501_263)"
      stroke-width="2"
      stroke-dasharray="24 24"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1501_263"
        x1="34.9183"
        y1="442.101"
        x2="784.833"
        y2="1144.37"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1501_263"
        x1="167.343"
        y1="431.234"
        x2="787.799"
        y2="1012.27"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1501_263"
        x1="306.613"
        y1="419.632"
        x2="791.294"
        y2="873.517"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1501_263"
        x1="-95.7485"
        y1="452.91"
        x2="782.046"
        y2="1274.93"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1501_263"
        x1="-218.203"
        y1="463.126"
        x2="779.579"
        y2="1397.51"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D18D21" />
        <stop offset="0.510417" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="#D89D41" />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.Edit"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.5 14.375V17.5H5.625L14.8417 8.28334L11.7167 5.15834L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
      fill="white"
    />
  </svg>

  <svg
    v-else-if="name === SvgNames.Close"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="2.28589"
      width="3.23249"
      height="19.3949"
      transform="rotate(-45 0 2.28589)"
      fill="white"
    />
    <rect
      width="3.23249"
      height="19.3949"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.0004 2.28589)"
      fill="white"
    />
  </svg>

  <svg
    v-else-if="name === SvgNames.Checkmark"
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.9999 11.2L1.7999 6.99998L0.399902 8.39998L5.9999 14L17.9999 1.99998L16.5999 0.599976L5.9999 11.2Z"
      fill="white"
    />
  </svg>

  <svg
    v-else-if="name === SvgNames.Arrow"
    width="30"
    height="59"
    viewBox="0 0 30 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.2" filter="url(#filter0_i_1501_348)">
      <path
        d="M0.000740659 29.6726L29.3281 0.345215L29.3281 59L0.000740659 29.6726Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_1501_348"
        x="0.000732422"
        y="0.345215"
        width="29.3274"
        height="62.6548"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1501_348" />
      </filter>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.ArrowTriangle"
    width="8"
    height="16"
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.1863 8.02209L0.115234 0.951019L0.0713242 15.049L7.1863 8.02209Z"
      fill="currentColor"
    />
  </svg>

  <svg
    v-else-if="name === SvgNames.PlanetIntrodus"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1390_936)">
      <path
        d="M210 119.836C210 169.451 169.706 209.672 120 209.672C70.2944 209.672 30 169.451 30 119.836C30 70.2211 70.2944 30.0001 120 30.0001C169.706 30.0001 210 70.2211 210 119.836Z"
        fill="#FEAA7B"
      />
      <path
        d="M208.445 103.983C200.598 145.403 163.984 176.74 120 176.74C76.0162 176.74 39.4016 145.403 31.5547 103.983C30.5339 109.371 30 114.93 30 120.613C30 169.98 70.2944 210 120 210C169.706 210 210 169.98 210 120.613C210 114.93 209.466 109.371 208.445 103.983Z"
        fill="#DA8E63"
      />
      <path
        d="M82.9412 93.4138C82.9412 101.197 76.6205 107.506 68.8236 107.506C61.0266 107.506 54.7059 101.197 54.7059 93.4138C54.7059 85.6311 61.0266 79.3219 68.8236 79.3219C76.6205 79.3219 82.9412 85.6311 82.9412 93.4138Z"
        fill="#DA8E63"
      />
      <path
        d="M121.765 130.405C121.765 135.269 117.814 139.213 112.941 139.213C108.068 139.213 104.118 135.269 104.118 130.405C104.118 125.541 108.068 121.598 112.941 121.598C117.814 121.598 121.765 125.541 121.765 130.405Z"
        fill="#DA8E63"
      />
      <path
        d="M174.706 107.506C174.706 115.289 168.385 121.598 160.588 121.598C152.791 121.598 146.471 115.289 146.471 107.506C146.471 99.723 152.791 93.4138 160.588 93.4138C168.385 93.4138 174.706 99.723 174.706 107.506Z"
        fill="#DA8E63"
      />
      <path
        d="M185.294 70.5144C185.294 75.3786 181.344 79.3218 176.471 79.3218C171.597 79.3218 167.647 75.3786 167.647 70.5144C167.647 65.6502 171.597 61.7069 176.471 61.7069C181.344 61.7069 185.294 65.6502 185.294 70.5144Z"
        fill="#DA8E63"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1390_936"
        x="0"
        y="6.10352e-05"
        width="240"
        height="240"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.996078 0 0 0 0 0.741176 0 0 0 0 0.588235 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1390_936" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1390_936"
          result="shape"
        />
      </filter>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.PlanetAmalin"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1409_1446)">
      <path
        d="M210 119.836C210 169.451 169.706 209.672 120 209.672C70.2944 209.672 30 169.451 30 119.836C30 70.221 70.2944 30 120 30C169.706 30 210 70.221 210 119.836Z"
        fill="#9DE5D8"
      />
      <path
        d="M208.445 103.983C200.598 145.403 163.984 176.74 120 176.74C76.0162 176.74 39.4016 145.403 31.5547 103.983C30.5339 109.371 30 114.93 30 120.613C30 169.98 70.2944 210 120 210C169.706 210 210 169.98 210 120.613C210 114.93 209.466 109.371 208.445 103.983Z"
        fill="#87C7BB"
      />
      <path
        d="M82.9412 93.4138C82.9412 101.197 76.6205 107.506 68.8236 107.506C61.0266 107.506 54.7059 101.197 54.7059 93.4138C54.7059 85.631 61.0266 79.3218 68.8236 79.3218C76.6205 79.3218 82.9412 85.631 82.9412 93.4138Z"
        fill="#87C7BB"
      />
      <path
        d="M121.765 130.405C121.765 135.269 117.814 139.213 112.941 139.213C108.068 139.213 104.118 135.269 104.118 130.405C104.118 125.541 108.068 121.598 112.941 121.598C117.814 121.598 121.765 125.541 121.765 130.405Z"
        fill="#87C7BB"
      />
      <path
        d="M174.706 107.506C174.706 115.288 168.385 121.598 160.588 121.598C152.791 121.598 146.471 115.288 146.471 107.506C146.471 99.7229 152.791 93.4138 160.588 93.4138C168.385 93.4138 174.706 99.7229 174.706 107.506Z"
        fill="#87C7BB"
      />
      <path
        d="M185.294 70.5143C185.294 75.3786 181.344 79.3218 176.471 79.3218C171.597 79.3218 167.647 75.3786 167.647 70.5143C167.647 65.6501 171.597 61.7069 176.471 61.7069C181.344 61.7069 185.294 65.6501 185.294 70.5143Z"
        fill="#87C7BB"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1409_1446"
        x="0"
        y="0"
        width="240"
        height="240"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.6 0 0 0 0 0.890196 0 0 0 0 0.839216 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1409_1446" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1409_1446"
          result="shape"
        />
      </filter>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.PlanetTrios"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1390_857)">
      <path
        d="M210 119.836C210 169.451 169.706 209.672 120 209.672C70.2944 209.672 30 169.451 30 119.836C30 70.221 70.2944 30 120 30C169.706 30 210 70.221 210 119.836Z"
        fill="#DDB4FF"
      />
      <path
        d="M208.445 103.983C200.598 145.403 163.984 176.74 120 176.74C76.0162 176.74 39.4016 145.403 31.5547 103.983C30.5339 109.371 30 114.93 30 120.613C30 169.98 70.2944 210 120 210C169.706 210 210 169.98 210 120.613C210 114.93 209.466 109.371 208.445 103.983Z"
        fill="#AA80CC"
      />
      <path
        d="M82.9412 93.4138C82.9412 101.197 76.6205 107.506 68.8236 107.506C61.0266 107.506 54.7059 101.197 54.7059 93.4138C54.7059 85.631 61.0266 79.3218 68.8236 79.3218C76.6205 79.3218 82.9412 85.631 82.9412 93.4138Z"
        fill="#AA80CC"
      />
      <path
        d="M121.765 130.405C121.765 135.269 117.814 139.213 112.941 139.213C108.068 139.213 104.118 135.269 104.118 130.405C104.118 125.541 108.068 121.598 112.941 121.598C117.814 121.598 121.765 125.541 121.765 130.405Z"
        fill="#AA80CC"
      />
      <path
        d="M174.706 107.506C174.706 115.288 168.385 121.598 160.588 121.598C152.791 121.598 146.471 115.288 146.471 107.506C146.471 99.7229 152.791 93.4138 160.588 93.4138C168.385 93.4138 174.706 99.7229 174.706 107.506Z"
        fill="#AA80CC"
      />
      <path
        d="M185.294 70.5143C185.294 75.3786 181.344 79.3218 176.471 79.3218C171.597 79.3218 167.647 75.3786 167.647 70.5143C167.647 65.6501 171.597 61.7069 176.471 61.7069C181.344 61.7069 185.294 65.6501 185.294 70.5143Z"
        fill="#AA80CC"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1390_857"
        x="0"
        y="0"
        width="240"
        height="240"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.866667 0 0 0 0 0.705882 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1390_857" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1390_857"
          result="shape"
        />
      </filter>
    </defs>
  </svg>

  <svg
    v-else-if="name === SvgNames.PlanetOpushop"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1390_866)">
      <path
        d="M210 119.836C210 169.451 169.706 209.672 120 209.672C70.2944 209.672 30 169.451 30 119.836C30 70.221 70.2944 30 120 30C169.706 30 210 70.221 210 119.836Z"
        fill="#C4FCA3"
      />
      <path
        d="M208.445 103.983C200.598 145.403 163.984 176.74 120 176.74C76.0162 176.74 39.4016 145.403 31.5547 103.983C30.5339 109.371 30 114.93 30 120.613C30 169.98 70.2944 210 120 210C169.706 210 210 169.98 210 120.613C210 114.93 209.466 109.371 208.445 103.983Z"
        fill="#A3D288"
      />
      <path
        d="M82.9412 93.4138C82.9412 101.197 76.6205 107.506 68.8236 107.506C61.0266 107.506 54.7059 101.197 54.7059 93.4138C54.7059 85.631 61.0266 79.3218 68.8236 79.3218C76.6205 79.3218 82.9412 85.631 82.9412 93.4138Z"
        fill="#A3D288"
      />
      <path
        d="M121.765 130.405C121.765 135.269 117.814 139.213 112.941 139.213C108.068 139.213 104.118 135.269 104.118 130.405C104.118 125.541 108.068 121.598 112.941 121.598C117.814 121.598 121.765 125.541 121.765 130.405Z"
        fill="#A3D288"
      />
      <path
        d="M174.706 107.506C174.706 115.288 168.385 121.598 160.588 121.598C152.791 121.598 146.471 115.288 146.471 107.506C146.471 99.7229 152.791 93.4138 160.588 93.4138C168.385 93.4138 174.706 99.7229 174.706 107.506Z"
        fill="#A3D288"
      />
      <path
        d="M185.294 70.5143C185.294 75.3786 181.344 79.3218 176.471 79.3218C171.597 79.3218 167.647 75.3786 167.647 70.5143C167.647 65.6501 171.597 61.7069 176.471 61.7069C181.344 61.7069 185.294 65.6501 185.294 70.5143Z"
        fill="#A3D288"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1390_866"
        x="0"
        y="0"
        width="240"
        height="240"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.768627 0 0 0 0 0.988235 0 0 0 0 0.639216 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1390_866" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1390_866"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>
