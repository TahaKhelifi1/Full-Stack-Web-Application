"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(formData.email);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Contact</h1>
      {ref && (
        <p className="text-sm text-gray-500 mb-4">
          Referred from: <span className="font-medium">{ref}</span>
        </p>
      )}

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-4">
          <p className="text-green-700 font-semibold">Message sent! We will be in touch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formData.email && !emailValid && (
              <small className="text-red-500 text-xs mt-1 block">
                Enter a valid email address
              </small>
            )}
          </div>
          <button
            type="submit"
            disabled={!formData.name || !emailValid}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-gray-400">Loading…</div>}>
      <ContactForm />
    </Suspense>
  );
}