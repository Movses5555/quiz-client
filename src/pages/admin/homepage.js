import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuestionList } from '../../components/admin/questionList'
import { QuestionDialog } from '../../components/admin/question'
import { Button } from "@material-tailwind/react";
import {
  fetchQuestionAsync,
  fetchSubQuestionsByIDAsync,
  deleteQuestionAsync,
  handleChangeOpenDialog,
} from "../../redux/adminQuestionSlice";


export const AdminHomePage = () => {

  const dispatch = useDispatch()

  const questions = useSelector((state) => state.adminQuestion.questions);
  // const loading = useSelector((state) => state.adminQuestion.loading);
  // const error = useSelector((state) => state.adminQuestion.error);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [parentQuestionID, setParentQuestionID] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestionAsync())
  }, [dispatch])

  // useEffect(() => {
  //   if(!localStorage.getItem('admin-token')) {
  //     navigate('/sign-in');
  //   }
  // }, [navigate]);

  const handleSubQuestions = (id) => {
    dispatch(fetchSubQuestionsByIDAsync(id))
  }

  const changeOpenDialog = (isOpen) => {
    dispatch(handleChangeOpenDialog(isOpen))
  }

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    changeOpenDialog(true);
  }

  const handleAddSubQuestion = (questionID) => {
    setParentQuestionID(questionID);
    changeOpenDialog(true);
  }

  const handleDeleteQuestion = (questionID) => {
    dispatch(deleteQuestionAsync(questionID))
  }

  return (
    <div className="px-10">
        <div>
          <Button color="blue" onClick={() => changeOpenDialog(true)}>Add new question</Button>
          <QuestionDialog
            selectedQuestion={selectedQuestion}
            parentQuestionID={parentQuestionID}
          />
        </div>
        <QuestionList 
          questions={questions}
          handleSubQuestions={handleSubQuestions}
          onEditQuestion={handleEditQuestion}
          onAddSubQuestion={handleAddSubQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
    </div>
  );
}

