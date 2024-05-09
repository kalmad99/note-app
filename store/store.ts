import { configureStore } from "@reduxjs/toolkit";
import NoteReducer from "../features/note/noteSlice";

export const store = configureStore({
  reducer: {
    note: NoteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
