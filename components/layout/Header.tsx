import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="TravelEase home">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-700 text-white shadow-soft">
            TE
          </span>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-slate-900">TravelEase</div>
            <div className="text-xs text-slate-500">Plan · Book · Go</div>
          </div>
        </Link>
        <Link
          href="/profile"
          className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          aria-label="Open profile"
        >
          Profile
        </Link>
      </div>
    </header>
  );
}

