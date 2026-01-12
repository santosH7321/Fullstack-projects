import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"

export const fetchBooks = createAsyncThunk(
  "admin/fetchBooks",
  async (_, { getState }) => {
    const token = getState().auth.user.token
    const res = await api.get("/books", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  }
)

export const deleteBook = createAsyncThunk(
  "admin/deleteBook",
  async (id, { getState }) => {
    const token = getState().auth.user.token
    await api.delete(`/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return id
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    books: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload
        state.loading = false
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book._id !== action.payload
        )
      })
  },
})

export default adminSlice.reducer
