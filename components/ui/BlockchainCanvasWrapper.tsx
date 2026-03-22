"use client";

import dynamic from "next/dynamic";

const BlockchainCanvas = dynamic(
  () => import("./BlockchainCanvas").then((m) => m.BlockchainCanvas),
  { ssr: false }
);

export function BlockchainCanvasWrapper({ opacity = 0.55 }: { opacity?: number }) {
  return <BlockchainCanvas opacity={opacity} />;
}
