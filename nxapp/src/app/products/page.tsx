import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { ProductsResponse } from "@/types/product";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api";

interface ProductsPageProps {
  searchParams: Promise<{ skip?: string; q?: string }>;
}

export const metadata = {
  title: "Products – nxapp",
  description: "Browse our product catalogue",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { skip: skipStr = "0", q = "" } = await searchParams;
  const skip = Number(skipStr);
  const limit = 12;

  const url = q
    ? `${API_URL}/products?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `${API_URL}/products?limit=${limit}&skip=${skip}`;

  let data: ProductsResponse;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-500 font-medium">Unable to load products. Please ensure the API is running.</p>
      </main>
    );
  }

  const { products, total } = data;
  const hasPrev = skip > 0;
  const hasNext = skip + limit < total;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Product Catalogue</h1>
      <p className="text-gray-500 mb-6">{total} products found</p>

      {/* Search form */}
      <form method="GET" className="flex gap-2 mb-8 max-w-md">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search products…"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
        {q && (
          <Link
            href="/products"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found for &ldquo;{q}&rdquo;.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-between mt-10 pt-4 border-t border-gray-200">
          <Link
            href={hasPrev ? `/products?skip=${skip - limit}${q ? `&q=${q}` : ""}` : "#"}
            className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
              hasPrev
                ? "border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                : "border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none"
            }`}
          >
            ← Previous
          </Link>
          <span className="text-sm text-gray-500">
            {skip + 1}–{Math.min(skip + limit, total)} / {total}
          </span>
          <Link
            href={hasNext ? `/products?skip=${skip + limit}${q ? `&q=${q}` : ""}` : "#"}
            className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
              hasNext
                ? "border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                : "border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </main>
  );
}
