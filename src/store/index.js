import { configureStore } from '@reduxjs/toolkit';

import peopleReducer from './slices/people';
import planetReducer from './slices/planet';

export default configureStore({
    reducer: {
        people: peopleReducer,
        planet: planetReducer
    }
});
