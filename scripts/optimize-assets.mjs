import sharp from 'sharp'

const assets = [
  { input: 'public/media/horto-source.jpg', output: 'public/media/horto.webp', width: 1800, position: 'centre' },
  { input: 'public/media/morro-source.jpg', output: 'public/media/morro.webp', width: 1800, position: 'centre' },
  { input: 'public/media/trem-source.jpg', output: 'public/media/trem.webp', width: 1800, position: 'centre' },
  { input: 'public/media/sky-source.jpg', output: 'public/media/sky-poster.webp', width: 1600, position: 'centre' },
]

for (const asset of assets) {
  await sharp(asset.input)
    .rotate()
    .resize({ width: asset.width, withoutEnlargement: true, fit: 'inside', position: asset.position })
    .webp({ quality: 80, effort: 5, smartSubsample: true })
    .toFile(asset.output)
}

console.log('Imagens WebP geradas com sucesso.')
