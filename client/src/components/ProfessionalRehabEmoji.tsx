export default function ProfessionalRehabEmoji() {
  return (
    <svg
      className="professional-rehab-emoji"
      viewBox="0 0 620 620"
      role="img"
      aria-labelledby="rehab-emoji-title rehab-emoji-description"
    >
      <title id="rehab-emoji-title">شخصية رياضية تؤدي تمرين تأهيل باستخدام شريط مقاومة</title>
      <desc id="rehab-emoji-description">
        رسم ثلاثي الأبعاد هادئ لشخص رياضي يؤدي تمرينًا متدرجًا مع إبراز مفصل الركبة.
      </desc>
      <defs>
        <linearGradient id="rehab-bg" x1="92" y1="72" x2="528" y2="550" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9FCFB" />
          <stop offset="1" stopColor="#DDEFE9" />
        </linearGradient>
        <linearGradient id="rehab-shirt" x1="265" y1="210" x2="377" y2="382" gradientUnits="userSpaceOnUse">
          <stop stopColor="#238D82" />
          <stop offset="1" stopColor="#12675F" />
        </linearGradient>
        <linearGradient id="rehab-shorts" x1="278" y1="350" x2="402" y2="430" gradientUnits="userSpaceOnUse">
          <stop stopColor="#244A55" />
          <stop offset="1" stopColor="#17343B" />
        </linearGradient>
        <linearGradient id="rehab-skin" x1="248" y1="120" x2="370" y2="430" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4C9A7" />
          <stop offset="1" stopColor="#E7A97D" />
        </linearGradient>
        <linearGradient id="rehab-band" x1="170" y1="270" x2="452" y2="355" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CCF6D" />
          <stop offset="1" stopColor="#4E9B57" />
        </linearGradient>
        <filter id="rehab-shadow" x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#17343B" floodOpacity="0.16" />
        </filter>
        <filter id="rehab-soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#17343B" floodOpacity="0.14" />
        </filter>
      </defs>

      <rect x="42" y="42" width="536" height="536" rx="146" fill="url(#rehab-bg)" />
      <circle cx="470" cy="154" r="68" fill="#FFFFFF" fillOpacity="0.58" />
      <circle cx="138" cy="426" r="76" fill="#CFE8DF" fillOpacity="0.62" />
      <path d="M106 331C161 245 240 199 328 196C420 193 498 238 538 316" stroke="#BFDCD3" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" />
      <ellipse cx="318" cy="520" rx="188" ry="34" fill="#17343B" fillOpacity="0.09" />

      <g filter="url(#rehab-shadow)">
        <path d="M267 219C293 196 341 194 369 219C393 241 398 290 388 346L250 343C242 292 244 241 267 219Z" fill="url(#rehab-shirt)" />
        <path d="M257 336C283 329 359 330 390 344L379 413L270 412L257 336Z" fill="url(#rehab-shorts)" />

        <path d="M276 245C238 255 205 281 181 317" stroke="url(#rehab-skin)" strokeWidth="38" strokeLinecap="round" />
        <path d="M364 244C398 256 428 282 452 317" stroke="url(#rehab-skin)" strokeWidth="38" strokeLinecap="round" />
        <circle cx="177" cy="322" r="21" fill="#E9B084" />
        <circle cx="456" cy="322" r="21" fill="#E9B084" />

        <path d="M179 324C242 291 389 291 455 324" stroke="url(#rehab-band)" strokeWidth="13" strokeLinecap="round" />
        <path d="M179 324C245 347 388 347 455 324" stroke="#3B864B" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.82" />

        <path d="M301 404C274 435 244 466 210 493" stroke="url(#rehab-skin)" strokeWidth="42" strokeLinecap="round" />
        <path d="M357 404C382 432 414 458 458 474" stroke="url(#rehab-skin)" strokeWidth="42" strokeLinecap="round" />
        <path d="M210 493C189 510 166 519 138 520" stroke="#244A55" strokeWidth="32" strokeLinecap="round" />
        <path d="M458 474C480 483 500 498 518 518" stroke="#244A55" strokeWidth="32" strokeLinecap="round" />

        <circle cx="320" cy="157" r="60" fill="url(#rehab-skin)" />
        <path d="M270 146C276 99 315 79 354 93C382 103 397 129 391 162C373 137 350 129 321 130C301 131 285 137 270 146Z" fill="#17343B" />
        <path d="M279 126C293 100 320 91 346 96" stroke="#294F59" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx="299" cy="158" rx="5" ry="7" fill="#17343B" />
        <ellipse cx="344" cy="158" rx="5" ry="7" fill="#17343B" />
        <path d="M306 181C317 190 331 190 342 181" stroke="#9C5D44" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M320 165L315 176H326" stroke="#D08D66" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      <g filter="url(#rehab-soft-shadow)">
        <circle cx="389" cy="439" r="28" fill="#FFF8E9" />
        <circle cx="389" cy="439" r="18" fill="#E6A63C" fillOpacity="0.22" />
        <path d="M389 426V452M376 439H402" stroke="#CE8527" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g filter="url(#rehab-soft-shadow)">
        <rect x="94" y="100" width="132" height="56" rx="20" fill="#FFFFFF" fillOpacity="0.92" />
        <circle cx="124" cy="128" r="15" fill="#E7F4EF" />
        <path d="M117 129L123 135L133 121" stroke="#16796F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="148" y="116" width="58" height="7" rx="3.5" fill="#244A55" fillOpacity="0.88" />
        <rect x="148" y="132" width="43" height="6" rx="3" fill="#809499" />
      </g>

      <g filter="url(#rehab-soft-shadow)">
        <rect x="410" y="386" width="122" height="58" rx="21" fill="#FFFFFF" fillOpacity="0.94" />
        <circle cx="439" cy="415" r="15" fill="#EDF6EA" />
        <path d="M433 417C436 407 444 405 449 411C452 415 449 421 439 426C430 422 428 418 433 417Z" fill="#5B9D5E" />
        <rect x="465" y="402" width="47" height="7" rx="3.5" fill="#244A55" fillOpacity="0.88" />
        <rect x="465" y="418" width="35" height="6" rx="3" fill="#809499" />
      </g>
    </svg>
  );
}
