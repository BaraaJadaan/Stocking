import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'searchValue',
  initialState:{
    search: 'TSLA'
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
  },
})

export const { setSearch } = searchSlice.actions

export default searchSlice.reducer