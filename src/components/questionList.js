import React, {useState} from "react";
import { Typography } from "@material-tailwind/react";
import { QuestionListItem } from './questionListItem';
 

export const QuestionList = ({
  questions,
  saveQuestionLoading,
  handleSaveAnswer,
}) => {
  const [open, setOpen] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [savingQuestionID, setSavingQuestionID] = useState(null);
 
  const handleOpen = (value) => {
    if(open.includes(value)) {
      setOpen([...open.filter(item => item !== value)])
    } else {
      setOpen([...open, value])
    }
  }

  const onChangeAnswer = (questionID, answerID) => {
    if(selectedData.find(item => item.questionID === questionID)) {
      let answers = selectedData.map(item => {
        if(item.questionID === questionID){
          return {
            questionID,
            answerID,
          }
        }
        return item;
      })
      setSelectedData(answers);
    } else {
      setSelectedData([...selectedData, { questionID, answerID }]);
    }
  }

  const onSaveAnswer = (questionID) => {
    const answer = selectedData.find(item => item.questionID === questionID);
    setSavingQuestionID(questionID)
    handleSaveAnswer(answer);
  }

  return (
    <div className="mt-4">
      <Typography variant="h2" color="blue-gray" className="mb-2">
        Question List
      </Typography>
      <QuestionListItem
        questions={questions}
        open={open}
        selectedData={selectedData}
        savingQuestionID={savingQuestionID}
        saveQuestionLoading={saveQuestionLoading}
        handleOpen={handleOpen}
        onChangeAnswer={onChangeAnswer}
        onSaveAnswer={onSaveAnswer}
      />
    </div>
  )
}

