import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { 
  fetchQuestionData,
  fetchSubQuestionsByIDData,
  saveAnswer,
} from '../api/user';


export const userQuestionSlice = createSlice({
  name: 'userQuestion',
  initialState: {
    questions: [],
    score: 0,
    loading: true,
    saveQuestionLoading: false,
    error: null,
  },
  reducers: {
    changeScore: () => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionAsync.pending, state => {
        state.loading = true;
      })
      .addCase(fetchQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data;
      })
      .addCase(fetchQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveAnswerAsync.pending, state => {
        state.saveQuestionLoading = true;
      })
      .addCase(saveAnswerAsync.fulfilled, (state, action) => {
        let { questionId, subQuestions, correctAnswerId, score } = action.payload.data;
        
        let oldQuestions = [...state.questions];
        let questions = changeQuestion(oldQuestions, questionId, subQuestions, correctAnswerId);
        state.saveQuestionLoading = false;
        state.score += score;
        state.questions = questions;
      })
      .addCase(saveAnswerAsync.rejected, (state, action) => {
        const { questionId, message, correctAnswerId } = action.payload;
        let oldQuestions = [...state.questions];
        let questions = changeQuestion(oldQuestions, questionId, [], correctAnswerId);
        state.questions = questions
        state.saveQuestionLoading = false;
        state.error = message;
      })
  },
});

const changeQuestion = (questions, questionId, subQuestions = [], correctAnswerId) => {
  if(!!questions) {
    let question = questions.find(item => item._id === questionId);
    if(!!question) {
      const changedQuestions = questions.map(item => {
        if(item._id === questionId) {
          return {
            ...question,
            answered: true,
            correctAnswerId,
            subQuestions,
          }
        }
        return item;
      });
      return changedQuestions;
    } else {
      return questions.map((item) => {
        if(!!item.hasChild && !!item.subQuestions) {
          let itemSubQuestions = changeQuestion(item.subQuestions, questionId, subQuestions, correctAnswerId);
          return {
            ...item,
            subQuestions: itemSubQuestions
          };
        }
        return item;
      });
    }
  }
};

export const fetchQuestionAsync = createAsyncThunk('userQuestion/fetchQuestion', async (_, thunkAPI) => {
  try {
    const response = await fetchQuestionData();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const saveAnswerAsync = createAsyncThunk('userQuestion/saveAnswer', async (data, thunkAPI) => {
  try {
    const response = await saveAnswer(data);
    return response;
  } catch(error) {
    const response = error?.response?.data;
    return thunkAPI.rejectWithValue(response);
  }
});

export const fetchSubQuestionsByIDAsync = createAsyncThunk('userQuestion/fetchSubQuestionsByID', async (id, thunkAPI) => {
  try {
    const response = await fetchSubQuestionsByIDData(id);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { changeBasketProductCount, changeBasketSelectedProduct } = userQuestionSlice.actions

export default userQuestionSlice.reducer;







