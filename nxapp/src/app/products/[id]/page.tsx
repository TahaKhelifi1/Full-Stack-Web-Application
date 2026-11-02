import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  return {
    title: `Product #${id} – nxapp`,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  let product: Product | null = null;
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
    if (res.ok) {
      product = await res.json();
    }
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Link href="/products" className="text-indigo-600 hover:underline text-sm">
          ← Back to catalogue
        </Link>
        <p className="mt-6 text-red-500 font-medium">Product not found.</p>
      </main>
    );
  }

  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : String(product.category ?? "");

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-8"
      >
        ← Back to catalogue
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-8 min-h-[320px]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain max-h-72"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">
            {categoryName}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
            {product.title}
          </h1>
          <div className="text-2xl font-extrabold text-indigo-700 mb-4">
            ${product.price}
            {product.discountPercentage && (
              <span className="ml-3 text-sm font-medium text-green-600 bg-green-50 rounded-full px-2 py-0.5">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>

          {product.rating !== undefined && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(product.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.168c.969 0 1.372 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.951 2.701c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.058 9.394c-.784-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} / 5</span>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {product.brand && (
            <p className="text-sm text-gray-500">
              Brand: <span className="font-semibold text-gray-700">{product.brand}</span>
            </p>
          )}
          {product.stock !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              In stock:{" "}
              <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
              </span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
