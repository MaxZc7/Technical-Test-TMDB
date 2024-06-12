export const PlayButton = () => (
  <svg
    fill="#FFFFFF"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 408.221 408.221"
    width={43}
    height={43}
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier"></g>
    <g id="SVGRepo_tracerCarrier"></g>
    <g id="SVGRepo_iconCarrier">
      {' '}
      <g>
        {' '}
        <g>
          {' '}
          <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11 C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012 c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"></path>{' '}
        </g>{' '}
      </g>{' '}
    </g>
  </svg>
);

export const LoadingIndicator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
    <circle
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="9"
      r="15"
      cx="40"
      cy="100"
    >
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.4"
      ></animate>
    </circle>
    <circle
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="9"
      r="15"
      cx="100"
      cy="100"
    >
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.2"
      ></animate>
    </circle>
    <circle
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="9"
      r="15"
      cx="160"
      cy="100"
    >
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="0"
      ></animate>
    </circle>
  </svg>
);
