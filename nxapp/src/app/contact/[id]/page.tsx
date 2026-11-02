"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";

function ContactDetailContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Page</h1>
      {params.id && (
        <p className="text-gray-600">
          Contact ID: <span className="font-semibold text-indigo-600">{params.id}</span>
        </p>
      )}
      {ref && (
        <p className="text-gray-500 text-sm mt-1">
          Referred from: <span className="font-medium">{ref}</span>
        </p>
      )}
    </div>
  );
}

export default function ContactDetail() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-gray-400">Loading…</div>}>
      <ContactDetailContent />
    </Suspense>
  );
}