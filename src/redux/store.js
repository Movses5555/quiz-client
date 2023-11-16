import { 
  configureStore, 
  combineReducers,
  // getDefaultMiddleware
} from '@reduxjs/toolkit';
import adminQuestionReducer from './adminQuestionSlice';
import userQuestionReducer from './userQuestionSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  adminQuestion: adminQuestionReducer,
  userQuestion: userQuestionReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'adminQuestion/fetchQuestion/fulfilled',
          'adminQuestion/createQuestion/fulfilled',
          'user/fetchUser/fulfilled',
          'userQuestion/saveAnswer/fulfilled',
          'userQuestion/fetchQuestion/fulfilled',
        ],
      },
    }),
});

