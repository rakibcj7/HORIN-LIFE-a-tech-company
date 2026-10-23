const shapes = {
  website: <><rect x="3" y="4" width="18" height="15" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01M8 22h8m-4-3v3" /></>,
  application: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>,
  desktop: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4m-5-9 3-3 2 2 4-4" /></>,
  business: <><path d="M3 21V7l9-4 9 4v14M3 10h18M8 10v11m8-11v11M1 21h22" /></>,
  engineers: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1zm12-9a3 3 0 1 0-1-5.8M17 14a5 5 0 0 1 4 5v1h-3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /><path d="m13 11 6-6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  alert: <><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  diagonal: <><path d="M7 17 17 7M7 7h10v10" /></>,
  back: <><path d="M19 12H5m6 6-6-6 6-6" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <><path d="M5 12h14" /></>,
  star: <path fill="currentColor" stroke="none" d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" />,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {shapes[name] || shapes.application}
    </svg>
  );
}
