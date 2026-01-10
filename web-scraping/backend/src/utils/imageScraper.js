import * as cheerio from "cheerio"

export const extractImages = (html, pageUrl) => {
  const $ = cheerio.load(html)
  const base = new URL(pageUrl)
  const images = new Set()

  const add = (src) => {
    if (!src || src.startsWith("data:")) return
    try {
      images.add(new URL(src, base).href)
    } catch {}
  }

  $("img").each((_, el) => {
    add($(el).attr("src"))
    const srcset = $(el).attr("srcset")
    if (srcset) {
      srcset.split(",").forEach(item =>
        add(item.trim().split(/\s+/)[0])
      )
    }
  })

  $("source").each((_, el) => {
    add($(el).attr("src"))
  })

  return [...images]
}
