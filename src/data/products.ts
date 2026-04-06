import clock01 from "@/assets/clock-01.jpg";
import clock02 from "@/assets/clock-02.jpg";
import clock03 from "@/assets/clock-03.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  size: string;
  sizeCategory: "30cm" | "40cm" | "custom";
  isNew?: boolean;
  inStock: boolean;
  features: string[];
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "oyrial-no-01",
    name: "Oyrial No. 01",
    price: 2500,
    description: "A statement in restraint. Matte black frame, silent sweep movement, minimal dial.",
    shortDescription: "Matte black. Silent. Minimal.",
    image: clock01,
    size: "30cm",
    sizeCategory: "30cm",
    isNew: true,
    inStock: true,
    features: ["Silent Movement", "Matte Finish", "Minimal Design", "Gift Box Included"],
    specs: [
      { label: "Diameter", value: "30cm" },
      { label: "Frame Material", value: "Aluminium, matte black" },
      { label: "Movement", value: "Silent sweep quartz" },
      { label: "Battery", value: "1x AA (included)" },
      { label: "Weight", value: "420g" },
    ],
  },
  {
    id: "oyrial-no-02",
    name: "Oyrial No. 02",
    price: 2800,
    description: "Pure white canvas with gold hands. A quiet statement of elegance for any room.",
    shortDescription: "Matte white. Gold hands. Serene.",
    image: clock02,
    size: "30cm",
    sizeCategory: "30cm",
    inStock: true,
    features: ["Silent Movement", "Matte Finish", "Minimal Design", "Gift Box Included"],
    specs: [
      { label: "Diameter", value: "30cm" },
      { label: "Frame Material", value: "Aluminium, matte white" },
      { label: "Movement", value: "Silent sweep quartz" },
      { label: "Battery", value: "1x AA (included)" },
      { label: "Weight", value: "400g" },
    ],
  },
  {
    id: "oyrial-no-03",
    name: "Oyrial No. 03",
    price: 3200,
    description: "Charcoal grey with Roman numerals and silver hands. Classic minimalism redefined.",
    shortDescription: "Charcoal. Roman numerals. Timeless.",
    image: clock03,
    size: "40cm",
    sizeCategory: "40cm",
    inStock: false,
    features: ["Silent Movement", "Matte Finish", "Roman Numerals", "Gift Box Included"],
    specs: [
      { label: "Diameter", value: "40cm" },
      { label: "Frame Material", value: "Aluminium, charcoal" },
      { label: "Movement", value: "Silent sweep quartz" },
      { label: "Battery", value: "1x AA (included)" },
      { label: "Weight", value: "580g" },
    ],
  },
];
