"use client";

import * as React from "react";

export function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
}
