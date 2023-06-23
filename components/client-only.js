"use client";

import { useEffect, useState, Suspense } from "react";

export const ClientOnly = ({ children, fallback = null }) => {
  const [isClient, itIs] = useState(false);

  useEffect(() => {
    itIs(true);
  }, []);

  if (isClient) return children;

  return fallback;
};

export const ClientSuspense = ({ children, fallback = null }) => {
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ClientOnly>
  );
};
