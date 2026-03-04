import { Suspense } from "react";
import Shell from "./shell";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-secondary w-full" />}>
      <Shell />
    </Suspense>
  );
}
