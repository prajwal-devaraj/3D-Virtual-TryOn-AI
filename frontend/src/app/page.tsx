"use client";

import { useMemo, useState } from "react";
import AvatarViewer from "@/components/AvatarViewer";

type BodyProfile = "male" | "female" | "neutral";
type CameraView = "front" | "side" | "back";

export default function Home() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);

  const [chest, setChest] = useState(95);
  const [waist, setWaist] = useState(82);
  const [hips, setHips] = useState(96);

  const [shoulder, setShoulder] = useState(45);
  const [armLength, setArmLength] = useState(62);
  const [inseam, setInseam] = useState(80);

  const [skinColor, setSkinColor] = useState("#c98f65");
  const [shirtColor, setShirtColor] = useState("#2563eb");

  const [bodyProfile, setBodyProfile] =
    useState<BodyProfile>("neutral");

  const [view, setView] =
    useState<CameraView>("front");

  const bmi = useMemo(() => {
    const heightInMeters = height / 100;

    return weight / (heightInMeters * heightInMeters);
  }, [height, weight]);

  const build = useMemo(() => {
    if (bmi < 20) {
      return "Lean";
    }

    if (bmi < 26) {
      return "Balanced";
    }

    if (bmi < 31) {
      return "Broad";
    }

    return "Full";
  }, [bmi]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* HEADER */}
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            AI Virtual Fitting Room
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            3D Virtual Try-On
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Build a personalized body profile and preview
            clothing in interactive 3D.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* LEFT PANEL */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              Body Profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Choose a starting body base and customize
              measurements.
            </p>

            {/* BODY TYPE */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <ProfileButton
                active={bodyProfile === "male"}
                onClick={() => setBodyProfile("male")}
              >
                Male
              </ProfileButton>

              <ProfileButton
                active={bodyProfile === "female"}
                onClick={() => setBodyProfile("female")}
              >
                Female
              </ProfileButton>

              <ProfileButton
                active={bodyProfile === "neutral"}
                onClick={() => setBodyProfile("neutral")}
              >
                Neutral
              </ProfileButton>
            </div>

            {/* BODY SLIDERS */}
            <div className="mt-7">
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
                label="Chest / Bust"
                value={chest}
                min={70}
                max={145}
                unit="cm"
                onChange={setChest}
              />

              <Slider
                label="Waist"
                value={waist}
                min={55}
                max={145}
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

              <Slider
                label="Shoulder Width"
                value={shoulder}
                min={34}
                max={60}
                unit="cm"
                onChange={setShoulder}
              />

              <Slider
                label="Arm Length"
                value={armLength}
                min={48}
                max={82}
                unit="cm"
                onChange={setArmLength}
              />

              <Slider
                label="Inseam"
                value={inseam}
                min={60}
                max={105}
                unit="cm"
                onChange={setInseam}
              />
            </div>

            {/* COLORS */}
            <div className="border-t border-slate-800 pt-6">
              <label className="mb-2 block font-medium">
                Skin tone
              </label>

              <input
                type="color"
                value={skinColor}
                onChange={(event) =>
                  setSkinColor(event.target.value)
                }
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
                onChange={(event) =>
                  setShirtColor(event.target.value)
                }
                className="h-12 w-full cursor-pointer rounded-lg border border-slate-700 bg-transparent"
              />
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="min-w-0">
            {/* TOP CONTROLS */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">
                  Current body build
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {build}

                  <span className="ml-2 text-sm font-normal text-slate-400">
                    BMI {bmi.toFixed(1)}
                  </span>
                </p>
              </div>

              {/* CAMERA BUTTONS */}
              <div className="flex flex-wrap gap-2">
                <ViewButton
                  active={view === "front"}
                  onClick={() => setView("front")}
                >
                  Front
                </ViewButton>

                <ViewButton
                  active={view === "side"}
                  onClick={() => setView("side")}
                >
                  Side
                </ViewButton>

                <ViewButton
                  active={view === "back"}
                  onClick={() => setView("back")}
                >
                  Back
                </ViewButton>
              </div>
            </div>

            {/* 3D AVATAR */}
            <AvatarViewer
              height={height}
              weight={weight}
              chest={chest}
              waist={waist}
              hips={hips}
              shoulder={shoulder}
              armLength={armLength}
              inseam={inseam}
              skinColor={skinColor}
              shirtColor={shirtColor}
              bodyProfile={bodyProfile}
              view={view}
            />

            {/* 3D INSTRUCTIONS */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-900 px-4 py-2">
                Drag → Rotate 360°
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Scroll → Zoom
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Front / Side / Back
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Sliders → Live body update
              </span>
            </div>

            {/* BODY SUMMARY */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MeasurementCard
                title="Body Base"
                value={capitalize(bodyProfile)}
              />

              <MeasurementCard
                title="Height"
                value={`${height} cm`}
              />

              <MeasurementCard
                title="Weight"
                value={`${weight} kg`}
              />

              <MeasurementCard
                title="Body Build"
                value={build}
              />

              <MeasurementCard
                title="Chest / Bust"
                value={`${chest} cm`}
              />

              <MeasurementCard
                title="Waist"
                value={`${waist} cm`}
              />

              <MeasurementCard
                title="Hips"
                value={`${hips} cm`}
              />

              <MeasurementCard
                title="Shoulders"
                value={`${shoulder} cm`}
              />

              <MeasurementCard
                title="Arm Length"
                value={`${armLength} cm`}
              />

              <MeasurementCard
                title="Inseam"
                value={`${inseam} cm`}
              />

              <MeasurementCard
                title="BMI"
                value={bmi.toFixed(1)}
              />

              <MeasurementCard
                title="Camera"
                value={capitalize(view)}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------
   SLIDER
--------------------------------------------------------- */

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
        <span className="font-medium">
          {label}
        </span>

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

/* ---------------------------------------------------------
   BUTTONS
--------------------------------------------------------- */

type ButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ProfileButton({
  active,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function ViewButton({
  active,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-slate-900 text-slate-300 hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------
   MEASUREMENT CARD
--------------------------------------------------------- */

function MeasurementCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}