export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.58 7.46L3 20.5l1.38-4.74A8.5 8.5 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.18 7.9c.2-.45.42-.46.64-.46h.54c.17 0 .38.06.47.34l.7 1.72c.08.2.05.37-.08.55l-.52.65c-.14.17-.17.3-.04.53.35.62.82 1.15 1.42 1.57.52.36.9.53 1.18.63.22.08.4.06.55-.12l.72-.84c.17-.2.34-.24.57-.15l1.7.8c.24.11.37.18.42.29.05.12.04.68-.18 1.24-.22.55-1.21 1.08-1.67 1.11-.47.03-.91.2-3.06-.7-2.57-1.08-4.2-3.76-4.32-3.93-.13-.17-1.04-1.38-1.04-2.63 0-1.25.66-1.86.9-2.1Z" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.89v-8.41H7.08v-3.48h3.05V9.42c0-3.02 1.79-4.68 4.53-4.68 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.48h-2.8v8.41C19.61 23.09 24 18.09 24 12.07Z" />
    </svg>
  );
}
