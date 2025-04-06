"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function BackgroundBeamsDemo({ children }) {
  return (
    <div
      className="min-h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        {children}
      <BackgroundBeams />
    </div>
  );
}
