import Link from "next/link";

const features = [
  {
    number: "01",
    label: "DROPS",
    title: "Sell your way.",
    description:
      "Run limited pre-orders or keep products available with an always-on store.",
  },
  {
    number: "02",
    label: "ORDERS",
    title: "Stay organized.",
    description:
      "Keep orders, customer details, and customizations in one place.",
  },
  {
    number: "03",
    label: "INVENTORY",
    title: "Know what you have.",
    description:
      "Track availability without relying on spreadsheets or guesswork.",
  },
  {
    number: "04",
    label: "PICKUP",
    title: "Hand off faster.",
    description:
      "Use QR pickups to make collecting completed orders quick and simple.",
  },
];

const steps = [
  ["01", "CREATE", "Set up your seller profile."],
  ["02", "DROP", "Add your products and start selling."],
  ["03", "GROW", "Build your campus customer base."],
];

const Page = () => {
  return (
    <main className="min-h-screen bg-paper-0 text-foreground">
      {/* HERO */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-5 text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
                Become a seller
              </p>

              <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink-900 sm:text-5xl lg:text-7xl">
                Turn your side hustle
                <br />
                into a <span className="text-rust-600">real business.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                CampusDrop gives you the tools to sell, manage orders, and
                organize pickups — all built around campus life.
              </p>

              <div className="mt-8">
                <Link
                  href="/seller/register"
                  className="inline-flex bg-rust-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rust-700"
                >
                  Start selling
                </Link>
              </div>
            </div>

            <div className="border border-ink-150 bg-paper-0 p-5 sm:min-w-64">
              <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                BUILT FOR
              </p>

              <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink-900">
                Student entrepreneurs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-paper-50">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-rust-600">
              Built different
            </p>

            <h2 className="mt-3 text-3xl font-semibold -tracking-caption text-ink-900 sm:text-5xl">
              Stop running your business from your DMs.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Your customers are on campus. Your business should be too.
            </p>

            <div className="mt-8">
              <Link
                href="/seller/register"
                className="inline-flex bg-rust-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rust-700"
              >
                Become a seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CAMPUSDROP */}
      <section className="border-t border-ink-150 bg-paper-0 rounded-2xl">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-caption font-bold uppercase tracking-[0.18em] text-rust-600">
              Your business, organized
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-4xl">
              Everything you need to sell on campus.
            </h2>
          </div>

          <div className="grid border-y border-ink-150 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.number}
                className={`py-8 sm:px-7 lg:py-10 ${
                  index !== features.length - 1
                    ? "border-b border-ink-150 sm:border-b-0 lg:border-r"
                    : ""
                } ${
                  index === 1
                    ? "sm:border-r sm:border-ink-150 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-mono text-ink-400">
                    {feature.number}
                  </span>

                  <span className="h-2 w-2 bg-rust-600" />
                </div>

                <p className="mt-12 text-caption font-bold tracking-[0.15em] text-marigold-600">
                  {feature.label}
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-body-m leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO START */}
      <section className="bg-ink-900 text-paper-0">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-caption font-bold uppercase tracking-[0.18em] text-marigold-400">
                Getting started
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Start selling in three steps.
              </h2>
            </div>

            <div className="grid border border-ink-700 sm:grid-cols-3">
              {steps.map(([number, label, description], index) => (
                <div
                  key={number}
                  className={`p-6 sm:p-7 ${
                    index !== steps.length - 1
                      ? "border-b border-ink-700 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <span className="font-mono text-mono text-ink-500">
                    {number}
                  </span>

                  <p className="mt-10 text-caption font-bold tracking-[0.15em] text-marigold-400">
                    {label}
                  </p>

                  <p className="mt-2 text-body-m leading-relaxed text-ink-300">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
};

export default Page;
