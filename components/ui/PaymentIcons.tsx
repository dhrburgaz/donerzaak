import type { PaymentMethodId } from "@/types";

/**
 * Small generic pictograms for payment methods — not the providers' own
 * trademarked logos/wordmarks. Consistent stroke language with the rest of
 * the icon system (see FoodIcons.tsx): 24x24 viewBox, currentColor so the
 * selected/unselected card color drives it.
 */
function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const icons: Record<PaymentMethodId, () => React.ReactNode> = {
  ideal: () => (
    <IconShell>
      <path d="M4 10l8-6 8 6" />
      <path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" />
      <path d="M3 19h18" />
    </IconShell>
  ),
  creditcard: () => (
    <IconShell>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10.5h18" />
      <path d="M6.5 15h4" />
    </IconShell>
  ),
  applepay: () => (
    <IconShell>
      <rect x="4" y="7" width="16" height="11" rx="2.5" />
      <path d="M8 7V6a2 2 0 0 1 2-2h1" />
      <path d="M13 15l1.5 1.5L17.5 13" />
    </IconShell>
  ),
  googlepay: () => (
    <IconShell>
      <rect x="4" y="7" width="16" height="11" rx="2.5" />
      <circle cx="9.5" cy="12.5" r="2" />
      <path d="M14 11h3M14 14h3" />
    </IconShell>
  ),
  paypal: () => (
    <IconShell>
      <path d="M6 19l2-13h5.5c2.5 0 4 1.4 3.6 3.6-.4 2.4-2.4 4-5 4H9.5L8.5 19Z" />
    </IconShell>
  ),
  bancontact: () => (
    <IconShell>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M8 12.5a3 3 0 0 1 4.5-2.6M16 12.5a3 3 0 0 1-4.5 2.6" />
    </IconShell>
  ),
  pin: () => (
    <IconShell>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </IconShell>
  ),
  contant: () => (
    <IconShell>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <circle cx="12" cy="12.5" r="2.5" />
    </IconShell>
  ),
};

export function PaymentIcon({ method }: { method: PaymentMethodId }) {
  const Render = icons[method];
  return <>{Render()}</>;
}
