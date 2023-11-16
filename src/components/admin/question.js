import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewQuestionAsync,
  updateQuestionAsync,
  handleChangeOpenDialog,
} from "../../redux/adminQuestionSlice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Radio,
  Textarea
} from "@material-tailwind/react";

 
const initialAnswers = [
  { answer: "", isCorrect: false },
  { answer: "", isCorrect: false },
];


export const QuestionDialog = ({
  selectedQuestion,
  parentQuestionID,
  errors,  
}) => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.adminQuestion.createNewQuestionLoading);
  const openDialog = useSelector((state) => state.adminQuestion.openDialog);
  const [question, setQuestion] = useState('');
  const [isSelectedCorrectAnswer, setSelectedCorrectAnswer] = useState(false);
  const [isSaveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [parentQuestionId, setParentQuestionId] = useState(null);
  const [answers, setAnswers] = useState(initialAnswers);
  const [errorsData, setErrorsData] = useState({});

  const setAllData = (data) => {
    if(data) {
      setQuestion(data.question);
      setParentQuestionId(data.parentQuestionID);
      setAnswers(data.answers);
    } else {
      setQuestion('');
      setAnswers(initialAnswers);
      if(parentQuestionID) {
        setParentQuestionId(parentQuestionID);
      } else {
        setParentQuestionId(null);
      }
    }
    setSelectedCorrectAnswer(true);
    setSaveBtnDisabled(false);
  }

  useEffect(() => {
    if(!!selectedQuestion) {
      setAllData(selectedQuestion)
    }
  }, [selectedQuestion])


  useEffect(() => {
    if(parentQuestionID) {
      setAllData();
    }
  }, [parentQuestionID])

  useEffect(() => {
    setErrorsData(errors)
  }, [errors]);

  useEffect(() => {
    if(question && isSelectedCorrectAnswer && answers?.[0].answer && answers?.[1].answer) {
      isSaveBtnDisabled && setSaveBtnDisabled(false);
    } else {
      !isSaveBtnDisabled && setSaveBtnDisabled(true);
    }
  }, [question, isSelectedCorrectAnswer, answers, isSaveBtnDisabled]);

  const changeOpenDialog = (isOpen) => {
    removeAllData();
    dispatch(handleChangeOpenDialog(isOpen))
  }


  const removeAllData = () => {
    setQuestion('');
    setSelectedCorrectAnswer(false);
    setSaveBtnDisabled(true);
    setParentQuestionId(null);
    setAnswers([
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ]);
  }
 

  const handleInputFocus = (name) => {
    setErrorsData({
      ...errorsData,
      [name] : null
    })
  }

  const handleChangeAnswer = (index, value) => {
    let data = answers;
    if(!!value) {
      data = data.map((item, i) => {
        if(i === index) {
          return {
            ...item,
            answer: value
          }
        }
        return item;
      });
    } else {
      data = data.map((item, i) => {
        if(i === index) {
          return {
            ...item,
            isCorrect: true
          }
        }
        return {
          ...item,
          isCorrect: false
        }
      });
    }
    if(!isSelectedCorrectAnswer && value === null) {
      setSelectedCorrectAnswer(true)
    }
    setAnswers(data);
  }

  const handleSaveQuestion = () => {
    if(!!selectedQuestion) {
      let data = {
        ...selectedQuestion,
        question: question,
        answers : answers,
      }
      dispatch(updateQuestionAsync(data));
    } else {
      let data = {
        question: question,
        answers : answers,
        parentQuestionID: parentQuestionId,
      }
      dispatch(createNewQuestionAsync(data));
    }
  }
 

  return (
    <Dialog
      open={openDialog}
      handler={changeOpenDialog}
      size={"md"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
        <DialogHeader>{ selectedQuestion ? 'Edit question' : 'Create new question' }</DialogHeader>
        <DialogBody>
          <div className="flex flex-col">
            <Textarea
              label="Question" 
              size="lg"
              name="question"
              error={!!errorsData?.question}
              value={ question || '' }
              onFocus={ () => handleInputFocus('question') }
              onChange={ (e) => setQuestion(e.target.value) }
            />
          </div>
          <div className="flex flex-col mt-3">
            <Typography variant="h4" color="blue-gray" className='mb-2'> Answers </Typography>
            <div>
              {
                answers?.map((answer, index) => {
                  return (
                    <div
                      key={index.toString()} 
                      className="flex mb-3"
                    >
                      <Input
                        label="Answer" 
                        size="lg"
                        name="answer2"
                        value={ answer.answer || '' }
                        onFocus={ () => handleInputFocus('answer2') }
                        onChange={ (e) => handleChangeAnswer(index, e.target.value) }
                      />
                      <Radio
                        ripple={false}
                        color='green'
                        className="hover:before:opacity-0"
                        checked={answer.isCorrect}
                        onChange={(e) => {
                          handleChangeAnswer(index, null);
                        }}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            disabled={loading}
            onClick={() => changeOpenDialog(false)}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            disabled={loading || isSaveBtnDisabled}
            onClick={handleSaveQuestion}
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
    </Dialog>
  );
}

