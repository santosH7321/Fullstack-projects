import axios from "axios"

export const fetchImages = async (url) => {
  const response = await axios.post("http://localhost:8080/api/images", {
    url,
  })
  return response.data
}
