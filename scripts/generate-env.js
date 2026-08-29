// scripts/generate-env.js
const fs = require('fs');
const path = require('path');

const licenseKey = process.env.PRIME_UI_LICENSE_KEY ?? '';

const content = `export const environment = {
  production: true,
  primeUILicense: '${licenseKey}',
};
`;

const outPath = path.join(__dirname, '../src/environments/environment.ts');
fs.writeFileSync(outPath, content);
console.log(`Generated ${outPath}`);
