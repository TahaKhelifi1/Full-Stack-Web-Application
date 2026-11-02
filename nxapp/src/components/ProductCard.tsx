import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : String(product.category ?? "");

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative bg-gray-50 h-52 flex items-center justify-center p-4">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-1">
          {categoryName}
        </span>
        <h2 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1 leading-snug min-h-[2.5rem]">
          {product.title}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-3 flex-1 leading-relaxed min-h-[3.6rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-lg font-extrabold text-indigo-700">
            ${product.price}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-xs font-semibold px-4 py-1.5 rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
