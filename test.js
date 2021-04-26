const playwright = require('playwright')
const DATA_SIZE = Math.pow(2, 20)

async function main () {
  for (const browserType of ['chromium', 'firefox']) {
    const browser = await playwright[browserType].launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4893')

    for (let i = 0; i < 10; i++) {
      const uploaded = await page.evaluate(async (size) => {
        const body = new FormData()
        body.set('file', new Blob([
          new Uint8Array(size)
        ]))

        const res = await fetch('http://127.0.0.1:4893', {
          method: 'POST',
          body
        })

        return parseInt(await res.text())
      }, DATA_SIZE)

      if (uploaded !== DATA_SIZE) {
        throw new Error(`${browserType} ${i} not ok - uploaded ${uploaded} expected ${DATA_SIZE}`)
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
