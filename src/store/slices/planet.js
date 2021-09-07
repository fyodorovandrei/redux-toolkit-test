import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlanet = createAsyncThunk('planet/fetchPlanet', async ({ id }, thunkApi) => {
    try {
        const res = await axios.get(`https://swapi.dev/api/planets/${id}/`);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue({
            error: error.message
        });
    }
});

const initialState = {
    item: undefined,
    loading: false,
    error: undefined
};

export const planetSlice = createSlice({
    name: 'planet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlanet.pending, (state) => {
            state.item = undefined;
            state.loading = true;
        });

        builder.addCase(fetchPlanet.fulfilled, (state, { payload }) => {
            state.item = payload;
            state.loading = false;
        });

        builder.addCase(fetchPlanet.rejected, (state, { error }) => {
            state.item = undefined;
            state.loading = false;
            state.error = error.message.toString();
        });
    }
});

export const selectPlanet = (state) => ({
    planet: state.planet.item,
    loading: state.planet.loading,
    error: state.planet.error
});

export default planetSlice.reducer;
