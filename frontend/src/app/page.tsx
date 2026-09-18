"use client";

import { useMemo, useState, type ReactNode } from "react";
import AvatarViewer from "@/components/AvatarViewer";

type BodyProfile = "male" | "female" | "neutral";
type CameraView = "front" | "side" | "back";

type LengthUnit = "cm" | "mm" | "m" | "in" | "ft";
type WeightUnit = "kg" | "g" | "lb";

export default function Home() {
  /*
   * IMPORTANT:
   * Internally we always store:
   * - length = centimeters
   * - weight = kilograms
   *
   * Units below only control how values are displayed.
   */

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

  const [lengthUnit, setLengthUnit] =
    useState<LengthUnit>("cm");

  const [weightUnit, setWeightUnit] =
    useState<WeightUnit>("kg");

  /*
   * BMI calculations always use kg + meters,
   * regardless of selected display unit.
   */
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
            Build a personalized body profile using your preferred
            measurement units and preview the result in interactive 3D.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[370px_1fr]">
          {/* LEFT PANEL */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              Body Profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Customize measurements using the units you normally use.
            </p>

            {/* BODY PROFILE */}
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

            {/* UNIT SETTINGS */}
            <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <h3 className="font-semibold">
                Measurement Units
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
                    Length
                  </label>

                  <select
                    value={lengthUnit}
                    onChange={(event) =>
                      setLengthUnit(
                        event.target.value as LengthUnit
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none"
                  >
                    <option value="cm">
                      Centimeters (cm)
                    </option>

                    <option value="mm">
                      Millimeters (mm)
                    </option>

                    <option value="m">
                      Meters (m)
                    </option>

                    <option value="in">
                      Inches (in)
                    </option>

                    <option value="ft">
                      Feet (ft)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
                    Weight
                  </label>

                  <select
                    value={weightUnit}
                    onChange={(event) =>
                      setWeightUnit(
                        event.target.value as WeightUnit
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none"
                  >
                    <option value="kg">
                      Kilograms (kg)
                    </option>

                    <option value="g">
                      Grams (g)
                    </option>

                    <option value="lb">
                      Pounds (lb)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* MEASUREMENTS */}
            <div className="mt-7">
              <Slider
                label="Height"
                value={height}
                min={145}
                max={210}
                displayValue={formatLength(
                  height,
                  lengthUnit
                )}
                onChange={setHeight}
              />

              <Slider
                label="Weight"
                value={weight}
                min={40}
                max={150}
                displayValue={formatWeight(
                  weight,
                  weightUnit
                )}
                onChange={setWeight}
              />

              <Slider
                label="Chest / Bust"
                value={chest}
                min={70}
                max={145}
                displayValue={formatLength(
                  chest,
                  lengthUnit
                )}
                onChange={setChest}
              />

              <Slider
                label="Waist"
                value={waist}
                min={55}
                max={145}
                displayValue={formatLength(
                  waist,
                  lengthUnit
                )}
                onChange={setWaist}
              />

              <Slider
                label="Hips"
                value={hips}
                min={70}
                max={150}
                displayValue={formatLength(
                  hips,
                  lengthUnit
                )}
                onChange={setHips}
              />

              <Slider
                label="Shoulder Width"
                value={shoulder}
                min={34}
                max={60}
                displayValue={formatLength(
                  shoulder,
                  lengthUnit
                )}
                onChange={setShoulder}
              />

              <Slider
                label="Arm Length"
                value={armLength}
                min={48}
                max={82}
                displayValue={formatLength(
                  armLength,
                  lengthUnit
                )}
                onChange={setArmLength}
              />

              <Slider
                label="Inseam"
                value={inseam}
                min={60}
                max={105}
                displayValue={formatLength(
                  inseam,
                  lengthUnit
                )}
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

          {/* RIGHT SIDE */}
          <section className="min-w-0">
            {/* BUILD + CAMERA */}
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

            {/* AVATAR */}
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

            {/* CONTROLS HELP */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-900 px-4 py-2">
                Drag → Rotate 360°
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Scroll → Zoom
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Units → Auto convert
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                Sliders → Live update
              </span>
            </div>

            {/* SUMMARY */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MeasurementCard
                title="Body Base"
                value={capitalize(bodyProfile)}
              />

              <MeasurementCard
                title="Height"
                value={formatLength(
                  height,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Weight"
                value={formatWeight(
                  weight,
                  weightUnit
                )}
              />

              <MeasurementCard
                title="Body Build"
                value={build}
              />

              <MeasurementCard
                title="Chest / Bust"
                value={formatLength(
                  chest,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Waist"
                value={formatLength(
                  waist,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Hips"
                value={formatLength(
                  hips,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Shoulders"
                value={formatLength(
                  shoulder,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Arm Length"
                value={formatLength(
                  armLength,
                  lengthUnit
                )}
              />

              <MeasurementCard
                title="Inseam"
                value={formatLength(
                  inseam,
                  lengthUnit
                )}
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

/* =========================================================
   SLIDER
========================================================= */

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  displayValue: string;
  onChange: (value: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  displayValue,
  onChange,
}: SliderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-medium">
          {label}
        </span>

        <span className="text-sm font-medium text-blue-400">
          {displayValue}
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

/* =========================================================
   BUTTONS
========================================================= */

type ButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
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

/* =========================================================
   MEASUREMENT CARD
========================================================= */

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

/* =========================================================
   UNIT CONVERSIONS
========================================================= */

function formatLength(
  centimeters: number,
  unit: LengthUnit
) {
  switch (unit) {
    case "mm":
      return `${Math.round(centimeters * 10)} mm`;

    case "m":
      return `${(centimeters / 100).toFixed(2)} m`;

    case "in":
      return `${(centimeters / 2.54).toFixed(1)} in`;

    case "ft":
      return `${(centimeters / 30.48).toFixed(2)} ft`;

    case "cm":
    default:
      return `${centimeters} cm`;
  }
}

function formatWeight(
  kilograms: number,
  unit: WeightUnit
) {
  switch (unit) {
    case "g":
      return `${Math.round(kilograms * 1000)} g`;

    case "lb":
      return `${(kilograms * 2.2046226218).toFixed(1)} lb`;

    case "kg":
    default:
      return `${kilograms} kg`;
  }
}

/* =========================================================
   HELPERS
========================================================= */

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}