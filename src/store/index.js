import { configureStore } from '@reduxjs/toolkit';

import peopleReducer from './slices/people';

export default configureStore({
    reducer: {
        people: peopleReducer
    }
});
