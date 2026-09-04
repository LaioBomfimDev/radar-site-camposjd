import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const source = process.argv[2]

if (!source) {
  throw new Error('Informe o caminho da arte original da Radar.')
}

const output = (name) => fileURLToPath(new URL(`../public/media/${name}`, import.meta.url))

const fullLogo = await sharp(source)
  .trim({ background: '#ffffff', threshold: 12 })
  .resize({ width: 920, withoutEnlargement: true })
  .webp({ quality: 88, effort: 6 })
  .toBuffer()

await sharp(fullLogo).toFile(output('radar-logo.webp'))

const wordmarkCrop = await sharp(source)
  .extract({ left: 86, top: 150, width: 1610, height: 390 })
  .toBuffer()

await sharp(wordmarkCrop)
  .trim({ background: '#ffffff', threshold: 12 })
  .resize({ width: 620, withoutEnlargement: true })
  .webp({ quality: 90, effort: 6 })
  .toFile(output('radar-wordmark.webp'))

const radarRCrop = await sharp(source)
  .extract({ left: 88, top: 160, width: 285, height: 380 })
  .toBuffer()

const radarR = await sharp(radarRCrop)
  .trim({ background: '#ffffff', threshold: 12 })
  .resize({ width: 176, height: 176, fit: 'contain', background: '#ffffff' })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer()

await sharp({
  create: {
    width: 192,
    height: 192,
    channels: 4,
    background: '#ffffff',
  },
})
  .composite([{ input: radarR, gravity: 'center' }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(output('radar-favicon.png'))

console.log('Assets Radar preparados em public/media.')
