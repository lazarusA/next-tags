import Link from "next/link";

export const metadata = {
  title: "next-tags/docs",
  description: "test docs page for next-tags",
};

export default function DocsPage() {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 mt-8">Next tags page</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Test template page</h2>
        <p className="mt-2">
            This is a test documentation page for the <code>next-tags</code> CI workflow.
        </p>
      </section>

      <div className="mt-8">
        <Link href="/" className="text-sm text-primary underline">
        ← Back to app
        </Link>
      </div>
    </div>
  );
}