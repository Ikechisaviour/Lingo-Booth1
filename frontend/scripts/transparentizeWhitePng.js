/* eslint-disable no-console */
// One-shot: take a white-background PNG and rewrite it with luminance-based
// alpha so the white pixels render transparent in every browser, without
// needing `mix-blend-mode: multiply` on the <img>.
//
// Why this exists: the landing-hero PNG was exported with a baked-in white
// background. Desktop hid that with `mix-blend-mode: multiply` against the
// page's green→orange gradient. Mobile Chrome / Android WebView don't apply
// mix-blend-mode reliably to <img> elements, so the white square showed
// through. This script bakes the equivalent of multiply-on-white into the
// alpha channel of the image so the same file renders correctly everywhere
// with no CSS trick required.
//
// Formula:  alpha = 255 − min(r, g, b)
//   • Pure white pixel → min 255 → alpha 0 (fully transparent)
//   • Pure black line  → min 0   → alpha 255 (fully opaque, RGB preserved)
//   • Colored dot (e.g. orange 255,100,0) → min 0 → alpha 255 (preserved)
//   • Anti-aliased edge (e.g. 220,220,220) → alpha 35 (semi-transparent edge)
//
// Run:  node scripts/transparentizeWhitePng.js public/images/landing-hero-hello.png
// Or:   node scripts/transparentizeWhitePng.js <input.png> [<output.png>]
//
// pngjs lives in mobile/node_modules; we reach into it so we don't add a new
// dep just to bake this one file. If the path changes, npm i -D pngjs in
// frontend and switch the require below.

const fs = require('fs');
const path = require('path');
const PNG = require(path.resolve(__dirname, '..', '..', 'mobile', 'node_modules', 'pngjs')).PNG;

function transparentize(inputPath, outputPath) {
  const buffer = fs.readFileSync(inputPath);
  const png = PNG.sync.read(buffer);

  // pngjs `sync.read` always returns a 4-channel RGBA buffer regardless of
  // the source colour type, so we can stride by 4 even for an RGB-only input.
  const { data, width, height } = png;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minChannel = r < g ? (r < b ? r : b) : (g < b ? g : b);
    data[i + 3] = 255 - minChannel;
  }

  // Re-emit as RGBA explicitly so the new alpha channel survives.
  const out = new PNG({ width, height, colorType: 6, inputColorType: 6 });
  data.copy(out.data);
  fs.writeFileSync(outputPath, PNG.sync.write(out));
  console.log(`Wrote ${outputPath} (${width}×${height}, RGBA)`);
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node scripts/transparentizeWhitePng.js <input.png> [output.png]');
    process.exit(1);
  }
  const input = path.resolve(args[0]);
  if (!fs.existsSync(input)) {
    console.error(`Not found: ${input}`);
    process.exit(1);
  }
  const output = args[1] ? path.resolve(args[1]) : input;
  transparentize(input, output);
}

main();
