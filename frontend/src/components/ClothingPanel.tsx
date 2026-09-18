"use client";

import {
  garments,
  getGarmentById,
  type FabricType,
  type GarmentSize,
} from "@/data/garments";

type ClothingPanelProps = {
  selectedGarmentId: string;
  selectedSize: GarmentSize;
  selectedFabric: FabricType;
  garmentColor: string;

  onGarmentChange: (id: string) => void;
  onSizeChange: (size: GarmentSize) => void;
  onFabricChange: (fabric: FabricType) => void;
  onColorChange: (color: string) => void;
};

export default function ClothingPanel({
  selectedGarmentId,
  selectedSize,
  selectedFabric,
  garmentColor,
  onGarmentChange,
  onSizeChange,
  onFabricChange,
  onColorChange,
}: ClothingPanelProps) {
  const selectedGarment =
    getGarmentById(selectedGarmentId) ?? garments[0];

  const selectedSizeData =
    selectedGarment.sizes.find(
      (item) => item.size === selectedSize
    ) ?? selectedGarment.sizes[2];

  function handleGarmentChange(id: string) {
    const garment = getGarmentById(id);

    if (!garment) {
      return;
    }

    onGarmentChange(id);
    onFabricChange(garment.fabric);
    onColorChange(garment.defaultColor);

    const hasCurrentSize = garment.sizes.some(
      (item) => item.size === selectedSize
    );

    if (!hasCurrentSize) {
      onSizeChange("M");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          Virtual Wardrobe
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Choose Clothing
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Select a garment, size, fabric and color.
        </p>
      </div>

      {/* GARMENT */}
      <div className="mt-6">
        <label className="mb-3 block text-sm font-medium">
          Garment
        </label>

        <div className="grid grid-cols-2 gap-2">
          {garments.map((garment) => {
            const active =
              selectedGarment.id === garment.id;

            return (
              <button
                key={garment.id}
                type="button"
                onClick={() =>
                  handleGarmentChange(garment.id)
                }
                className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                  active
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-700"
                }`}
              >
                <span className="block font-medium">
                  {garment.name}
                </span>

                <span
                  className={`mt-1 block text-xs ${
                    active
                      ? "text-blue-100"
                      : "text-slate-500"
                  }`}
                >
                  {formatCategory(garment.category)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div className="mt-7">
        <label className="mb-3 block text-sm font-medium">
          Size
        </label>

        <div className="grid grid-cols-6 gap-2">
          {selectedGarment.sizes.map((item) => {
            const active =
              item.size === selectedSize;

            return (
              <button
                key={item.size}
                type="button"
                onClick={() =>
                  onSizeChange(item.size)
                }
                className={`rounded-lg px-2 py-3 text-xs font-semibold transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {item.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* FABRIC */}
      <div className="mt-7">
        <label className="mb-2 block text-sm font-medium">
          Fabric
        </label>

        <select
          value={selectedFabric}
          onChange={(event) =>
            onFabricChange(
              event.target.value as FabricType
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {selectedGarment.availableFabrics.map(
            (fabric) => (
              <option
                key={fabric}
                value={fabric}
              >
                {fabric}
              </option>
            )
          )}
        </select>
      </div>

      {/* COLOR */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Garment Color
        </label>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={garmentColor}
            onChange={(event) =>
              onColorChange(event.target.value)
            }
            className="h-12 w-20 cursor-pointer rounded-lg border border-slate-700 bg-transparent"
          />

          <div className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <span className="text-sm text-slate-300">
              {garmentColor.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* SELECTED GARMENT */}
      <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Selected
        </p>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">
              {selectedGarment.name}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {selectedSize} · {selectedFabric}
            </p>
          </div>

          <div
            className="h-10 w-10 shrink-0 rounded-full border border-slate-600"
            style={{
              backgroundColor: garmentColor,
            }}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {selectedSizeData.measurements.chest !==
            undefined && (
            <Measurement
              label="Chest"
              value={`${selectedSizeData.measurements.chest} cm`}
            />
          )}

          {selectedSizeData.measurements.waist !==
            undefined && (
            <Measurement
              label="Waist"
              value={`${selectedSizeData.measurements.waist} cm`}
            />
          )}

          {selectedSizeData.measurements.hips !==
            undefined && (
            <Measurement
              label="Hips"
              value={`${selectedSizeData.measurements.hips} cm`}
            />
          )}

          {selectedSizeData.measurements.shoulder !==
            undefined && (
            <Measurement
              label="Shoulder"
              value={`${selectedSizeData.measurements.shoulder} cm`}
            />
          )}

          {selectedSizeData.measurements.length !==
            undefined && (
            <Measurement
              label="Length"
              value={`${selectedSizeData.measurements.length} cm`}
            />
          )}

          {selectedSizeData.measurements.inseam !==
            undefined && (
            <Measurement
              label="Inseam"
              value={`${selectedSizeData.measurements.inseam} cm`}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Measurement({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-900 p-3">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function formatCategory(
  category: "top" | "bottom" | "full"
) {
  switch (category) {
    case "top":
      return "Upper body";

    case "bottom":
      return "Lower body";

    case "full":
      return "Full body";

    default:
      return category;
  }
}