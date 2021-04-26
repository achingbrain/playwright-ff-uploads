const playwright = require('playwright')
const ONE_MEG = Math.pow(2, 20)

async function main () {
  for (const browserType of ['chromium', 'firefox']) {
    const browser = await playwright[browserType].launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4893')

    for (let i = 0; i < 10; i++) {
      const uploaded = await page.evaluate(async () => {
        const ONE_MEG = Math.pow(2, 20)

        const body = new FormData()
        body.set('file', new Blob([
          Uint8Array.from(new Array(ONE_MEG).fill(0))
        ]))

        const res = await fetch('http://127.0.0.1:4893', {
          method: 'POST',
          body
        })

        return parseInt(await res.text())
      })

      if (uploaded !== ONE_MEG) {
        throw new Error(`${browserType} ${i} not ok - uploaded ${uploaded} expected ${ONE_MEG}`)
      } else {
        console.info(browserType, i, 'ok')
      }
    }

    await browser.close()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
