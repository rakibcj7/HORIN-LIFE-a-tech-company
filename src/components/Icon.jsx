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
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14.5 14.5 0 0 0 0 18 14.5 14.5 0 0 0 0-18" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3.5h2.2l2.6 11.6a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L21 8H6" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9.5h18" /><path d="M9.5 20V9.5" /></>,
  palette: <><path d="M12 3c-5 0-9 4-9 9s4 9 9 9c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16c3 0 5-2 5-5 0-4.3-4-6.5-9-6.5z" /><circle cx="7.6" cy="12.4" r="1.1" fill="currentColor" stroke="none" /><circle cx="9.7" cy="8.4" r="1.1" fill="currentColor" stroke="none" /><circle cx="14.6" cy="7.9" r="1.1" fill="currentColor" stroke="none" /></>,
  server: <><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01" /><path d="M7 16.5h.01" /></>,
  phone: <><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.8 18.5h2.4" /></>,
  bot: <><path d="M12 8V4.5H8" /><rect x="4" y="8" width="16" height="12" rx="2.5" /><path d="M2 13.5h2" /><path d="M20 13.5h2" /><path d="M9.5 13v2" /><path d="M14.5 13v2" /></>,
  trending: <><path d="M3 17.5 9.5 11l4 4L21 7.5" /><path d="M15.5 7.5H21V13" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20.5 20.5-4.3-4.3" /></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {shapes[name] || shapes.application}
    </svg>
  );
}
