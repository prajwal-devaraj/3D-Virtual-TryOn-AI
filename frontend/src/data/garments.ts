export type GarmentType =
  | "tshirt"
  | "shirt"
  | "hoodie"
  | "jacket"
  | "pants"
  | "dress"
  | "skirt";

export type GarmentSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL";

export type FabricType =
  | "Cotton"
  | "Denim"
  | "Silk"
  | "Polyester"
  | "Wool";

export type GarmentMeasurements = {
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  length?: number;
  inseam?: number;
};

export type GarmentSizeData = {
  size: GarmentSize;
  measurements: GarmentMeasurements;
};

export type Garment = {
  id: string;
  name: string;
  type: GarmentType;
  category: "top" | "bottom" | "full";
  defaultColor: string;
  fabric: FabricType;
  availableFabrics: FabricType[];
  sizes: GarmentSizeData[];
};

export const garments: Garment[] = [
  {
    id: "classic-tshirt",
    name: "Classic T-Shirt",
    type: "tshirt",
    category: "top",

    defaultColor: "#2563eb",

    fabric: "Cotton",

    availableFabrics: [
      "Cotton",
      "Polyester",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          chest: 86,
          waist: 74,
          shoulder: 40,
          length: 64,
        },
      },
      {
        size: "S",
        measurements: {
          chest: 92,
          waist: 80,
          shoulder: 42,
          length: 66,
        },
      },
      {
        size: "M",
        measurements: {
          chest: 100,
          waist: 88,
          shoulder: 44,
          length: 69,
        },
      },
      {
        size: "L",
        measurements: {
          chest: 108,
          waist: 96,
          shoulder: 46,
          length: 72,
        },
      },
      {
        size: "XL",
        measurements: {
          chest: 116,
          waist: 104,
          shoulder: 48,
          length: 74,
        },
      },
      {
        size: "XXL",
        measurements: {
          chest: 126,
          waist: 114,
          shoulder: 51,
          length: 77,
        },
      },
    ],
  },

  {
    id: "formal-shirt",
    name: "Formal Shirt",
    type: "shirt",
    category: "top",

    defaultColor: "#f8fafc",

    fabric: "Cotton",

    availableFabrics: [
      "Cotton",
      "Polyester",
      "Silk",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          chest: 88,
          waist: 76,
          shoulder: 40,
          length: 67,
        },
      },
      {
        size: "S",
        measurements: {
          chest: 94,
          waist: 82,
          shoulder: 42,
          length: 69,
        },
      },
      {
        size: "M",
        measurements: {
          chest: 102,
          waist: 90,
          shoulder: 44,
          length: 72,
        },
      },
      {
        size: "L",
        measurements: {
          chest: 110,
          waist: 98,
          shoulder: 47,
          length: 74,
        },
      },
      {
        size: "XL",
        measurements: {
          chest: 118,
          waist: 106,
          shoulder: 49,
          length: 76,
        },
      },
      {
        size: "XXL",
        measurements: {
          chest: 128,
          waist: 116,
          shoulder: 52,
          length: 79,
        },
      },
    ],
  },

  {
    id: "everyday-hoodie",
    name: "Everyday Hoodie",
    type: "hoodie",
    category: "top",

    defaultColor: "#7c3aed",

    fabric: "Cotton",

    availableFabrics: [
      "Cotton",
      "Polyester",
      "Wool",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          chest: 92,
          waist: 84,
          shoulder: 42,
          length: 65,
        },
      },
      {
        size: "S",
        measurements: {
          chest: 98,
          waist: 90,
          shoulder: 44,
          length: 68,
        },
      },
      {
        size: "M",
        measurements: {
          chest: 106,
          waist: 98,
          shoulder: 47,
          length: 71,
        },
      },
      {
        size: "L",
        measurements: {
          chest: 114,
          waist: 106,
          shoulder: 49,
          length: 74,
        },
      },
      {
        size: "XL",
        measurements: {
          chest: 122,
          waist: 114,
          shoulder: 52,
          length: 77,
        },
      },
      {
        size: "XXL",
        measurements: {
          chest: 132,
          waist: 124,
          shoulder: 55,
          length: 80,
        },
      },
    ],
  },

  {
    id: "denim-jacket",
    name: "Denim Jacket",
    type: "jacket",
    category: "top",

    defaultColor: "#1d4ed8",

    fabric: "Denim",

    availableFabrics: [
      "Denim",
      "Cotton",
      "Polyester",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          chest: 90,
          waist: 80,
          shoulder: 41,
          length: 61,
        },
      },
      {
        size: "S",
        measurements: {
          chest: 96,
          waist: 86,
          shoulder: 43,
          length: 63,
        },
      },
      {
        size: "M",
        measurements: {
          chest: 104,
          waist: 94,
          shoulder: 46,
          length: 66,
        },
      },
      {
        size: "L",
        measurements: {
          chest: 112,
          waist: 102,
          shoulder: 48,
          length: 68,
        },
      },
      {
        size: "XL",
        measurements: {
          chest: 120,
          waist: 110,
          shoulder: 51,
          length: 71,
        },
      },
      {
        size: "XXL",
        measurements: {
          chest: 130,
          waist: 120,
          shoulder: 54,
          length: 74,
        },
      },
    ],
  },

  {
    id: "classic-pants",
    name: "Classic Pants",
    type: "pants",
    category: "bottom",

    defaultColor: "#111827",

    fabric: "Cotton",

    availableFabrics: [
      "Cotton",
      "Denim",
      "Polyester",
      "Wool",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          waist: 70,
          hips: 88,
          inseam: 76,
        },
      },
      {
        size: "S",
        measurements: {
          waist: 76,
          hips: 94,
          inseam: 78,
        },
      },
      {
        size: "M",
        measurements: {
          waist: 84,
          hips: 102,
          inseam: 80,
        },
      },
      {
        size: "L",
        measurements: {
          waist: 92,
          hips: 110,
          inseam: 82,
        },
      },
      {
        size: "XL",
        measurements: {
          waist: 102,
          hips: 120,
          inseam: 84,
        },
      },
      {
        size: "XXL",
        measurements: {
          waist: 112,
          hips: 130,
          inseam: 86,
        },
      },
    ],
  },

  {
    id: "classic-dress",
    name: "Classic Dress",
    type: "dress",
    category: "full",

    defaultColor: "#db2777",

    fabric: "Silk",

    availableFabrics: [
      "Cotton",
      "Silk",
      "Polyester",
      "Wool",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          chest: 82,
          waist: 64,
          hips: 88,
          shoulder: 36,
          length: 96,
        },
      },
      {
        size: "S",
        measurements: {
          chest: 88,
          waist: 70,
          hips: 94,
          shoulder: 38,
          length: 98,
        },
      },
      {
        size: "M",
        measurements: {
          chest: 96,
          waist: 78,
          hips: 102,
          shoulder: 40,
          length: 101,
        },
      },
      {
        size: "L",
        measurements: {
          chest: 104,
          waist: 86,
          hips: 110,
          shoulder: 42,
          length: 104,
        },
      },
      {
        size: "XL",
        measurements: {
          chest: 114,
          waist: 96,
          hips: 120,
          shoulder: 44,
          length: 107,
        },
      },
      {
        size: "XXL",
        measurements: {
          chest: 124,
          waist: 106,
          hips: 130,
          shoulder: 47,
          length: 110,
        },
      },
    ],
  },

  {
    id: "classic-skirt",
    name: "Classic Skirt",
    type: "skirt",
    category: "bottom",

    defaultColor: "#7c2d12",

    fabric: "Cotton",

    availableFabrics: [
      "Cotton",
      "Denim",
      "Silk",
      "Polyester",
    ],

    sizes: [
      {
        size: "XS",
        measurements: {
          waist: 64,
          hips: 88,
          length: 54,
        },
      },
      {
        size: "S",
        measurements: {
          waist: 70,
          hips: 94,
          length: 55,
        },
      },
      {
        size: "M",
        measurements: {
          waist: 78,
          hips: 102,
          length: 57,
        },
      },
      {
        size: "L",
        measurements: {
          waist: 86,
          hips: 110,
          length: 59,
        },
      },
      {
        size: "XL",
        measurements: {
          waist: 96,
          hips: 120,
          length: 61,
        },
      },
      {
        size: "XXL",
        measurements: {
          waist: 106,
          hips: 130,
          length: 63,
        },
      },
    ],
  },
];

export function getGarmentById(id: string) {
  return garments.find((garment) => garment.id === id);
}