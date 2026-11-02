export default function About() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">About this project</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        This is the <strong>nxapp</strong> — a Next.js 16 application built as part of a fullstack lab
        comparing Angular and Next.js. It demonstrates routing, API calls, forms, and component communication.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Framework: Next.js 16 (App Router, Server Components)</li>
        <li>Styling: Tailwind CSS v4</li>
        <li>API: dummyjson.com</li>
        <li>Language: TypeScript (strict mode)</li>
      </ul>
    </main>
  );
}
