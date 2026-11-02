import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/products"
        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Go to Products
      </Link>
    </main>
  );
}
