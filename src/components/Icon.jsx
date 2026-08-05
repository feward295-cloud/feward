const paths = {
  home: <><path d="M4 11L12 4l8 7" /><path d="M6 10v10h5v-6h2v6h5V10" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M4 20c0-3 2.5-5 5-5s5 2 5 5" /><circle cx="17" cy="9" r="2.3" /><path d="M15 20c0-2.5 1.8-4.3 4-4.6" /></>,
  search: <><circle cx="10" cy="10" r="6" /><line x1="15" y1="15" x2="20" y2="20" /></>,
  send: <path d="M4 20l16-8L4 4v6l10 2-10 2z" />,
  bell: <><path d="M6 16V10a6 6 0 0 1 12 0v6l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  image: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10.5" r="1.5" /><path d="M21 15l-5-5-4 4-3-3-6 6" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>,
  layers: <><polygon points="12,3 21,8 12,13 3,8" /><polyline points="3,13 12,18 21,13" /></>,
  code: <><polyline points="8,6 3,12 8,18" /><polyline points="16,6 21,12 16,18" /></>,
  heart: <path d="M12 20s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.4-9.5 9-9.5 9z" />,
  comment: <path d="M4 4h16v12H8l-4 4V4z" />,
  share: <><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><line x1="7.8" y1="11" x2="16.2" y2="7" /><line x1="7.8" y1="13" x2="16.2" y2="17" /></>,
  back: <polyline points="15,18 9,12 15,6" />,
  close: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  edit: <path d="M3 21l4-1 11-11-3-3L4 17z" />,
  trash: <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></>,
  check: <polyline points="4,12 9,17 20,6" />,
}

export default function Icon({ name, size = 20, strokeWidth = 2, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || null}
    </svg>
  )
}
