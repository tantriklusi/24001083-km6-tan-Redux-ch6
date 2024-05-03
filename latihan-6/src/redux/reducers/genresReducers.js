import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TVGenres: [],
  selectedGenre: "",
  filteredShows: [],
};

const GenreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setTVGenres: (state, action) => {
      state.TVGenres = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setFilteredShows: (state, action) => {
      state.filteredShows = action.payload;
    },
  },
});

export const { setTVGenres, setSelectedGenre, setFilteredShows } = GenreSlice.actions;
export default GenreSlice.reducer;
