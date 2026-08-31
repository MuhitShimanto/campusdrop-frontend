import Link from "next/link";

const buyerSteps = [
  ["01", "DISCOVER", "Find what students are selling."],
  ["02", "CLAIM", "Order a drop or grab what's available."],
  ["03", "COLLECT", "Pick it up with a quick QR scan."],
];

const sellerSteps = [
  ["01", "CREATE", "Launch a drop or keep a store live."],
  ["02", "MANAGE", "Handle orders, inventory, and options."],
  ["03", "FULFILL", "Organize pickups and hand off orders."],
];

const Page = () => {
  return (
    <main className="min-h-screen bg-paper-0 text-foreground">
      {/* HERO */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
              How it works
            </p>

            <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink-900 sm:text-5xl lg:text-7xl">
              Campus commerce,
              <br />
              <span className="text-rust-600">without the chaos.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover student businesses, claim drops, and pick up your
              orders — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* BUY / SELL */}
      <section className="border-t border-ink-150">
        <div className="container mx-auto grid px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* BUY */}
          <div className="border-b border-ink-150 py-14 lg:border-b-0 lg:border-r lg:py-20 lg:pr-12">
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
              For buyers
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-ink-900">
              Find it. Claim it. Collect it.
            </h2>

            <div className="mt-10 divide-y divide-ink-150 border-y border-ink-150">
              {buyerSteps.map(([number, label, text]) => (
                <div key={number} className="flex gap-5 py-5">
                  <span className="font-mono text-mono text-rust-600">
                    {number}
                  </span>

                  <div>
                    <p className="text-caption font-bold tracking-[0.14em] text-ink-500">
                      {label}
                    </p>

                    <p className="mt-1 text-body-m text-ink-800">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SELL */}
          <div className="py-14 lg:py-20 lg:pl-12">
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-rust-600">
              For sellers
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-ink-900">
              Turn your hustle into a business.
            </h2>

            <div className="mt-10 divide-y divide-ink-150 border-y border-ink-150">
              {sellerSteps.map(([number, label, text]) => (
                <div key={number} className="flex gap-5 py-5">
                  <span className="font-mono text-mono text-rust-600">
                    {number}
                  </span>

                  <div>
                    <p className="text-caption font-bold tracking-[0.14em] text-ink-500">
                      {label}
                    </p>

                    <p className="mt-1 text-body-m text-ink-800">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="bg-ink-900 text-paper-0">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-caption font-bold uppercase tracking-[0.18em] text-marigold-400">
                Built for campus
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                More than a marketplace.
              </h2>
            </div>

            <div className="grid grid-cols-2 border border-ink-700 sm:grid-cols-4">
              <div className="border-b border-r border-ink-700 p-5 sm:border-b-0">
                <p className="font-mono text-2xl font-bold">01</p>
                <p className="mt-3 text-caption font-bold tracking-[0.12em] text-ink-300">
                  PREORDERS
                </p>
              </div>

              <div className="border-b border-ink-700 p-5 sm:border-b-0 sm:border-r">
                <p className="font-mono text-2xl font-bold">02</p>
                <p className="mt-3 text-caption font-bold tracking-[0.12em] text-ink-300">
                  STORES
                </p>
              </div>

              <div className="border-r border-ink-700 p-5">
                <p className="font-mono text-2xl font-bold">03</p>
                <p className="mt-3 text-caption font-bold tracking-[0.12em] text-ink-300">
                  INVENTORY
                </p>
              </div>

              <div className="p-5">
                <p className="font-mono text-2xl font-bold">04</p>
                <p className="mt-3 text-caption font-bold tracking-[0.12em] text-ink-300">
                  QR PICKUP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
            CampusDrop
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-ink-900 sm:text-5xl">
            The commerce layer for campus.
          </h2>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex bg-rust-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rust-700"
            >
              Explore drops
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;