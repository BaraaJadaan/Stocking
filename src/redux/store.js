import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './reducers'

export default configureStore({
  reducer: {
    searchValue : searchReducer,
  },
})

