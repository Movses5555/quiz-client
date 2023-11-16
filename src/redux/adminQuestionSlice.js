import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { 
  fetchQuestionData,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
  fetchSubQuestionsByIDData,
} from '../api/admin';


export const adminQuestionSlice = createSlice({
  name: 'adminQuestion',
  initialState: {
    questions: [],
    loading: true,
    subQuestionsLoading: false,
    createNewQuestionLoading: false,
    openDialog: false,
    error: null,
  },
  reducers: {
    handleChangeOpenDialog: (state, action) => {
      state.openDialog = action.payload;
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

      .addCase(createNewQuestionAsync.pending, state => {
        state.createNewQuestionLoading = true;
      })
      .addCase(createNewQuestionAsync.fulfilled, (state, action) => {
        const newQuestion = action.payload.data;
        let questions = [...state.questions];
        if(!newQuestion?.parentQuestionID) {
          questions = [...questions, newQuestion];
        } else {
          questions = changeQuestions(questions, newQuestion, true);
        }
        state.createNewQuestionLoading = false;
        state.questions = questions;
        state.openDialog = false;
      })
      .addCase(createNewQuestionAsync.rejected, (state, action) => {
        state.createNewQuestionLoading = false;
        state.error = action.payload;
      })

      .addCase(updateQuestionAsync.pending, state => {
      })
      .addCase(updateQuestionAsync.fulfilled, (state, action) => {
        const updatedQuestion = action.payload.data;
        let questions = [...state.questions];
        if(!updatedQuestion?.parentQuestionID) {
          questions = questions.map(item => {
            if(item._id === updatedQuestion._id) {
              return updatedQuestion;
            }
            return item;
          });
        } else {
          questions = changeQuestions(questions, updatedQuestion, false);
        }
        state.createNewQuestionLoading = false;
        state.questions = questions;
        state.openDialog = false;
      })
      .addCase(updateQuestionAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteQuestionAsync.pending, state => {
      })
      .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
        const deletedQuestionID = action.payload;
        const questions = removeDeleteQuestions(state.questions, deletedQuestionID);
        state.questions = questions;
      })
      .addCase(deleteQuestionAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSubQuestionsByIDAsync.pending, state => {
        state.subQuestionsLoading = true;
      })
      .addCase(fetchSubQuestionsByIDAsync.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        const questions = addSubQuestions(state.questions, id, data);
        state.subQuestionsLoading = false;
        state.questions = questions;
      })
      .addCase(fetchSubQuestionsByIDAsync.rejected, (state, action) => {
        state.subQuestionsLoading = false;
        state.error = action.payload;
      })
  },
});


export const fetchQuestionAsync = createAsyncThunk('adminQuestion/fetchQuestion', async (_, thunkAPI) => {
  try {
    const response = await fetchQuestionData();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createNewQuestionAsync = createAsyncThunk('adminQuestion/createQuestion', async (data, thunkAPI) => {
  try {
    const response = await createNewQuestion(data);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateQuestionAsync = createAsyncThunk('adminQuestion/updateQuestion', async (data, thunkAPI) => {
  try {
    const response = await updateQuestion(data);
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteQuestionAsync = createAsyncThunk('adminQuestion/deleteQuestion', async (id, thunkAPI) => {
  try {
    await deleteQuestion(id);
    return id;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchSubQuestionsByIDAsync = createAsyncThunk('adminQuestion/fetchSubQuestionsByID', async (id, thunkAPI) => {
  try {
    const response = await fetchSubQuestionsByIDData(id);
    return {data: response.data, id};
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const removeDeleteQuestions = (questions, deletedQuestionID) => {
  let question = questions.find(item => item._id === deletedQuestionID)
  if(question) {
    return questions.filter(item => item._id !== deletedQuestionID);
  } else {
    return questions.map((item) => {
      if(!!item.hasChild && item.subQuestions) {
        let itemSubQuestions = removeDeleteQuestions(item.subQuestions, deletedQuestionID);
        return {
          ...item,
          subQuestions: itemSubQuestions
        };
      } else {
        return item;
      }
    });
  }
};

const addSubQuestions = (questions, parentID, subQuestions) => {
  return questions.map((item) => {
    if(item._id === parentID) {
      return {
        ...item,
        subQuestions,
      }
    } else if(!!item.hasChild && item.subQuestions) {
      let itemSubQuestions = addSubQuestions(item.subQuestions, parentID, subQuestions);
      return {
        ...item,
        subQuestions: itemSubQuestions
      };
    } else {
      return item;
    }
  });
};

const changeQuestions = (questions, question, isNew) => {
  return questions.map((item) => {
    if(item._id === question.parentQuestionID) {
      let newData = {
        ...item,
        hasChild: true,
      };
      if(!!item.subQuestions) {
        if(isNew) {
          newData = {
            ...newData,
            subQuestions: [
              ...item.subQuestions,
              question,
            ]
          };
        } else {
          let subQuestions = item.subQuestions.map(subItem => {
            if(subItem._id === question._id) {
              return question;
            }
            return subItem;
          })
          newData = {
            ...newData,
            subQuestions: [...subQuestions]
          };
        }
      } else {
        newData = {
          ...newData,
          subQuestions: [question]
        };
      }
      return newData;
    } else if(!!item.hasChild && !!item.subQuestions) {
      let itemSubQuestions = changeQuestions(item.subQuestions, question, isNew);
      return {
        ...item,
        subQuestions: itemSubQuestions
      };
    } else {
      return item;
    }
  });
};

export const { handleChangeOpenDialog } = adminQuestionSlice.actions

export default adminQuestionSlice.reducer;







