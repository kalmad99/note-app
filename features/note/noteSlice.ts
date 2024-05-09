import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NoteData {
  id: string;
  title: string;
  description: string;
  updatedAt?: string;
}

const initialState: NoteData[] = [];

export const NoteSlice = createSlice({
  name: "Note",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<NoteData>) => {
        state.push(action.payload);
      },
      prepare: (title: string, description: string) => {
        const date = new Date();
        const formattedDate = `${
          date.getMonth()
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            updatedAt: formattedDate,
          },
        };
      },
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action: PayloadAction<NoteData>) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      const date = new Date();
      const formattedDate = `${
        date.getMonth()
      }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

      if (index !== -1) {
        state[index] = {
          ...action.payload,
          updatedAt: formattedDate,
        };
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = NoteSlice.actions;

export default NoteSlice.reducer;
