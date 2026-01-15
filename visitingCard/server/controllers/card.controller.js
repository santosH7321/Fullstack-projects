import Card from "../models/Card.model.js"

export const createCard = async (req, res) => {
  try {
    const card = await Card.create(req.body)
    res.status(201).json(card)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    res.json(card)
  } catch (error) {
    res.status(404).json({ message: "Card not found" })
  }
}

export const getAllCards = async (req, res) => {
  const cards = await Card.find()
  res.json(cards)
}
