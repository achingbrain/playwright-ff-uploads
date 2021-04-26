
const ONE_MEG = Math.pow(2, 20)

describe('test', () => {
  it('should upload', async () => {
    for (let i = 0; i < 10; i++) {
      console.info('attempt', i)

      const data = Uint8Array.from(new Array(ONE_MEG).fill(0))

      const body = new FormData()
      body.set('file', new Blob([data]))

      const res = await fetch('http://127.0.0.1:4893', {
        method: 'POST',
        body
      })

      const read = parseInt(await res.text())

      if (read !== ONE_MEG) {
        throw new Error(`Data size mismatch - sent ${ONE_MEG}, server counted ${read} bytes\n`)
      }
    }
  })
})
