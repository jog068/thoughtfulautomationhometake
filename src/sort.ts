export type Stack = "STANDARD" | "SPECIAL" | "REJECTED";

const BULKY_VOLUME_THRESHOLD_CM3 = 1_000_000;
const BULKY_DIMENSION_THRESHOLD_CM = 150;
const HEAVY_MASS_THRESHOLD_KG = 20;

export function sort(
  width: number,
  height: number,
  length: number,
  mass: number,
): Stack {
  assertValidNonNegativeNumber(width, "width");
  assertValidNonNegativeNumber(height, "height");
  assertValidNonNegativeNumber(length, "length");
  assertValidNonNegativeNumber(mass, "mass");

  const volume = width * height * length;
  const bulky =
    volume >= BULKY_VOLUME_THRESHOLD_CM3 ||
    width >= BULKY_DIMENSION_THRESHOLD_CM ||
    height >= BULKY_DIMENSION_THRESHOLD_CM ||
    length >= BULKY_DIMENSION_THRESHOLD_CM;
  const heavy = mass >= HEAVY_MASS_THRESHOLD_KG;

  if (bulky && heavy) {
    return "REJECTED";
  }

  if (bulky || heavy) {
    return "SPECIAL";
  }

  return "STANDARD";
}

function assertValidNonNegativeNumber(value: number, label: string): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number`);
  }

  if (value < 0) {
    throw new RangeError(`${label} must be non-negative`);
  }
}
