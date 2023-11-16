import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionList } from '../components/questionList'
import {
  fetchQuestionAsync,
  fetchSubQuestionsByIDAsync,
  saveAnswerAsync,
} from "../redux/userQuestionSlice";
import { Typography } from "@material-tailwind/react";

export const HomePage = () => {

  const dispatch = useDispatch()

  const score = useSelector((state) => state.userQuestion.score);
  const saveQuestionLoading = useSelector((state) => state.userQuestion.saveQuestionLoading);
  const questions = useSelector((state) => state.userQuestion.questions);
  // const loading = useSelector((state) => state.userQuestion.loading);
  // const error = useSelector((state) => state.userQuestion.error);

  useEffect(() => {
    dispatch(fetchQuestionAsync())
  }, [dispatch])


  const handleSubQuestions = (id) => {
    dispatch(fetchSubQuestionsByIDAsync(id))
  }

  const handleSaveAnswer = (data) => {
    dispatch(saveAnswerAsync(data))
  }

  return (
    <div className="px-10">
      <div>
        <Typography variant='h1' color="blue-gray" className="font-bold">
          Score { Math.round(score * 100)/100 } / 100
        </Typography>
      </div>
      <QuestionList
        questions={questions}
        handleSaveAnswer={handleSaveAnswer}
        handleSubQuestions={handleSubQuestions}
        saveQuestionLoading={saveQuestionLoading}
      />
    </div>
  );
}
