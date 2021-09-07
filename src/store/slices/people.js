import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPeople = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, search }, thunkApi) => {
        try {
            const searchParams = new URLSearchParams();
            searchParams.set('page', page);
            if (search) {
                searchParams.set('search', search);
            }
            const res = await axios.get(`https://swapi.dev/api/people?${searchParams.toString()}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue({
                error: error.message
            });
        }
    }
);

const initialState = {
    items: [],
    total: 0,
    loading: false,
    error: undefined
};

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPeople.pending, (state) => {
            state.items = [];
            state.loading = true;
        });

        builder.addCase(fetchPeople.fulfilled, (state, { payload }) => {
            state.items = payload.results;
            state.total = payload.count;
            state.loading = false;
        });

        builder.addCase(fetchPeople.rejected, (state, { error }) => {
            state.items = [];
            state.loading = false;
            state.error = error.message.toString();
        });
    }
});

export const selectPeople = (state) => ({
    people: state.people.items,
    loading: state.people.loading,
    total: state.people.total,
    error: state.people.error
});

export default peopleSlice.reducer;
