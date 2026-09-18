"use client";

import { useState } from "react";
import AvatarViewer from "@/components/AvatarViewer";

export default function Home() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [chest, setChest] = useState(95);
  const [waist, setWaist] = useState(82);
  const [hips, setHips] = useState(96);

  const [skinColor, setSkinColor] = useState("#c98f65");
  const [shirtColor, setShirtColor] = useState("#2563eb");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            AI Virtual Fitting Room
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            3D Virtual Try-On
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Customize your body measurements and view the changes in 3D.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Body Profile
            </h2>

            <Slider
              label="Height"
              value={height}
              min={145}
              max={210}
              unit="cm"
              onChange={setHeight}
            />

            <Slider
              label="Weight"
              value={weight}
              min={40}
              max={150}
              unit="kg"
              onChange={setWeight}
            />

            <Slider
              label="Chest"
              value={chest}
              min={70}
              max={140}
              unit="cm"
              onChange={setChest}
            />

            <Slider
              label="Waist"
              value={waist}
              min={55}
              max={140}
              unit="cm"
              onChange={setWaist}
            />

            <Slider
              label="Hips"
              value={hips}
              min={70}
              max={150}
              unit="cm"
              onChange={setHips}
            />

            <div className="mt-6 border-t border-slate-800 pt-6">
              <label className="mb-2 block font-medium">
                Skin tone
              </label>

              <input
                type="color"
                value={skinColor}
                onChange={(event) => setSkinColor(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border border-slate-700 bg-transparent"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-medium">
                Shirt color
              </label>

              <input
                type="color"
                value={shirtColor}
                onChange={(event) => setShirtColor(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border border-slate-700 bg-transparent"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-400">
              <p>
                Height:{" "}
                <span className="text-white">
                  {height} cm
                </span>
              </p>

              <p className="mt-1">
                Weight:{" "}
                <span className="text-white">
                  {weight} kg
                </span>
              </p>

              <p className="mt-1">
                Chest / Waist / Hips:{" "}
                <span className="text-white">
                  {chest} / {waist} / {hips} cm
                </span>
              </p>
            </div>
          </section>

          <section className="min-w-0">
            <AvatarViewer
              height={height}
              weight={weight}
              chest={chest}
              waist={waist}
              hips={hips}
              skinColor={skinColor}
              shirtColor={shirtColor}
            />

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-900 px-4 py-2">
                Drag → Rotate 360°
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Scroll → Zoom
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Sliders → Change body
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: SliderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="font-medium">
          {label}
        </label>

        <span className="text-sm font-medium text-blue-400">
          {value} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="w-full cursor-pointer accent-blue-500"
      />
    </div>
  );
}