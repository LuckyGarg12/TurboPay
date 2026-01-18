import { type JSX } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl border-b border-slate-300 pb-2">
        {title}
      </h1>
      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}
