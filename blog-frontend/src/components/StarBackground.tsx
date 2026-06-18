"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function StarBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 -z-10 bg-star-dark">
      <Particles
        id="star-particles"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            number: {
              value: 120,
              density: { enable: true },
            },
            color: {
              value: ["#c0d8ff", "#8b5cf6", "#ffffff", "#61DAFB"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.2, max: 0.8 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#1e2948",
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none" as const,
              random: true,
              straight: false,
              outModes: {
                default: "bounce" as const,
              },
              attract: {
                enable: true,
                rotate: { x: 600, y: 1200 },
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
                parallax: { enable: false },
              },
              resize: { enable: true },
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.4,
                  color: "#8b5cf6",
                },
              },
            },
          },
          detectRetina: true,
        }}
        className="h-full w-full"
      />
    </div>
  );
}
