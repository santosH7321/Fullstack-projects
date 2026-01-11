import Book from "../models/Book.js"

// PUBLIC - Get all books
export const getBooks = async (req, res) => {
  const books = await Book.find()
  res.json(books)
}

// ADMIN - Create book
export const createBook = async (req, res) => {
  const book = await Book.create(req.body)
  res.status(201).json(book)
}

// ADMIN - Update book
export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(book)
}

// ADMIN - Delete book
export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  res.json({ message: "Book deleted" })
}
