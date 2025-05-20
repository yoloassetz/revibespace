// components/Badge.tsx
import React from "react";

export function Badge({
  label,
  colorClass,
}: {
  label: string;
  colorClass: string;
}) {
  return (
    <span
      className={`${colorClass} text-white text-xs px-2 py-1 rounded-full inline-block`}
    >
      {label}
    </span>
  );
}