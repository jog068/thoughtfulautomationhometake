import { sort } from './index.js';

/**
 * CLI entrypoint.
 * Usage: npm start -- <width_cm> <height_cm> <length_cm> <mass_kg>
 */
function main(): void {
  const args = process.argv.slice(2);

  if (args.length !== 4) {
    console.error('Usage: npm start -- <width_cm> <height_cm> <length_cm> <mass_kg>');
    process.exitCode = 1;
    return;
  }

  const [widthRaw, heightRaw, lengthRaw, massRaw] = args;
  const width = Number(widthRaw);
  const height = Number(heightRaw);
  const length = Number(lengthRaw);
  const mass = Number(massRaw);

  try {
    const stack = sort(width, height, length, mass);
    console.log(stack);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unexpected error');
    }
    process.exitCode = 1;
  }
}

main();
