import { Metadata } from "next";

import { CinematicIntroContent } from "@/components/pages/test/CinematicIntroContent";

export const metadata: Metadata = {
  title: "Kashiyatra'27 — Enter",
  description: "Experience the cinematic entrance to Kashiyatra 2027",
};

export default function TestPage() {
  return <CinematicIntroContent />;
}
