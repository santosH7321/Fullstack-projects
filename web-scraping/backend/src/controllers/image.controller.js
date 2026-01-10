import axios from "axios"
import { isValidUrl } from "../utils/isValidUrl.js"
import { extractImages } from "../utils/imageScraper.js"

export const fetchImages = async (req, res) => {
  const { url } = req.body

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Please provide a valid URL" })
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ImageGrabber/1.0)",
      },
    })

    const images = extractImages(data, url)
    return res.json(images)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      error: "Failed to fetch page or parse HTML",
    })
  }
}
