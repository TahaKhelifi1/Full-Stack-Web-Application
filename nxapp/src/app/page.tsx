"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Child from "@/components/Child";

export default function Home() {
  const router = useRouter();
  const [states] = useState(["Tozeur", "Gafsa", "Tunis"]);
  const [chosen, setChosen] = useState("");

  function gotoLogin() {
    router.push("/login");
  }

  function gotoContact() {
    router.push("/contact/123");
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Home – Routing Demo</h1>

      {/* Programmatic navigation */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Programmatic navigation
        </h2>
        <div className="flex gap-3 flex-wrap">
          <button
            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white text-sm hover:bg-indigo-700 transition-colors"
            onClick={gotoLogin}
          >
            Login Page
          </button>
          <button
            className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white text-sm hover:bg-emerald-700 transition-colors"
            onClick={gotoContact}
          >
            Contact Page
          </button>
          <button
            className="rounded-lg border border-gray-300 px-5 py-2 font-semibold text-gray-600 text-sm hover:bg-gray-100 transition-colors"
            onClick={() => router.back()}
          >
            ← Back
          </button>
        </div>
      </section>

      {/* Parent → child / child → parent demo */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Parent ↔ Child communication
        </h2>
        <Child states={states} onSelect={setChosen} />
        {chosen && (
          <p className="mt-3 text-sm text-gray-700">
            Selected: <span className="font-bold text-indigo-600">{chosen}</span>
          </p>
        )}
      </section>
    </main>
  );
}