"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category: "",
    stock: "10",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products?limit=50&skip=0`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData({
      id: 0,
      title: "",
      description: "",
      price: "",
      thumbnail: "",
      category: "",
      stock: "10",
    });
    setIsEditing(false);
  }

  function startEdit(p: Product) {
    setIsEditing(true);
    const catName = typeof p.category === "object" && p.category ? p.category.name : String(p.category ?? "");
    setFormData({
      id: p.id,
      title: p.title,
      description: p.description,
      price: String(p.price),
      thumbnail: p.thumbnail,
      category: catName,
      stock: String(p.stock ?? 10),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      thumbnail: formData.thumbnail || "https://cdn.dummyjson.com/product-images/1/thumbnail.webp",
      category: formData.category || "General",
      stock: parseInt(formData.stock, 10) || 0,
    };

    try {
      if (isEditing) {
        const res = await fetch(`${API_BASE}/products/${formData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }
        setSuccess(`Product #${formData.id} updated successfully!`);
      } else {
        const res = await fetch(`${API_BASE}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }
        setSuccess("Product created successfully!");
      }

      resetForm();
      loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(`Are you sure you want to delete product #${id}?`)) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setSuccess(`Product #${id} deleted.`);
      loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin – Manage Products</h1>
          <p className="text-sm text-gray-500">Create, edit, and delete products via the Express REST API</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          {success}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {isEditing ? `Edit Product #${formData.id}` : "Create New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Vintage Leather Bag"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              placeholder="e.g. accessories"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="e.g. 29.99"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              placeholder="e.g. 15"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleInputChange}
              required
              placeholder="https://cdn.dummyjson.com/product-images/1/thumbnail.webp"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Full product details and specifications..."
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {isEditing ? "Save Changes" : "Create Product"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Current Products ({products.length})</h2>
          <button
            onClick={loadProducts}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No products in database yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => {
                  const catName =
                    typeof p.category === "object" && p.category ? p.category.name : String(p.category ?? "");
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                          {catName}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900">${p.price}</td>
                      <td className="px-4 py-3">{p.stock ?? 0}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
