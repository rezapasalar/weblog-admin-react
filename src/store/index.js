import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './slices/global'
import usersReducer from './slices/users'
import articlesReducer from './slices/articles'
import todosReducer from './slices/todos'

export const store = configureStore({
    reducer: {
        global: globalReducer,
        users: usersReducer,
        articles: articlesReducer,
        todos: todosReducer
    }
})