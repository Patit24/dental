"use client";

import dynamic from "next/dynamic";

const Dental3DScene = dynamic(() => import("./dental-3d-scene"), {
  ssr: false,
  loading: () => <div className="dental-3d-fallback" aria-hidden="true"><span /><span /><span /></div>,
});

export function Dental3DLayer() {
  return <Dental3DScene />;
}
