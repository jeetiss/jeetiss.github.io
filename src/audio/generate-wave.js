function generateWave (audioBuffer, { width, height, size = 5, gap = 1 }) {
  const barHeight = ~~((height - size) / 2)
  const length = ~~((width - size + gap) / (size + gap))

  const sampleSize = audioBuffer.length / length
  const sampleStep = ~~(sampleSize / 10) || 1
  const channelData = audioBuffer.getChannelData(0)

  // calculate peaks
  let peaks = []
  let globalMax = 0

  for (let peakNumber = 0; peakNumber < length; peakNumber++) {
    const start = ~~(peakNumber * sampleSize)
    const end = ~~(start + sampleSize)

    let max = channelData[0]

    for (
      let sampleIndex = start;
      sampleIndex < end;
      sampleIndex += sampleStep
    ) {
      const value = channelData[sampleIndex]

      max = Math.max(Math.abs(value), max)
    }

    globalMax = Math.max(globalMax, max)
    peaks[peakNumber] = max
  }

  // normalize peaks
  peaks = peaks.map((peak) => ~~((peak / globalMax) * barHeight))

  // generate svg
  const box = `0 -${~~(height / 2)} ${width} ${height}`
  const d = peaks
    .map((peak, index) => {
      const y = index * (size + gap) + Math.ceil(size / 2)

      return `M${y}, ${peak} L${y}, ${-peak}`
    })
    .join(' ')

  return { box, d }
}

export { generateWave }
