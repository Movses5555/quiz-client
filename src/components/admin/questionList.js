import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { QuestionListItem } from './questionListItem'
 

export const QuestionList = ({
  questions,
  handleSubQuestions,
  onEditQuestion,
  onAddSubQuestion,
  onDeleteQuestion,
}) => {
  const [open, setOpen] = useState([]);
 
  const handleOpen = (value) => {
    if(open.includes(value)) {
      setOpen([...open.filter(item => item !== value)])
    } else {
      setOpen([...open, value])
    }
  }
 
  return (
    <div className="mt-4">
      <Typography variant="h2" color="blue-gray" className="mb-2">
        Question List
      </Typography>
      <QuestionListItem
        questions={questions}
        open={open}
        handleOpen={handleOpen}
        handleSubQuestions={handleSubQuestions}
        onEditQuestion={onEditQuestion}
        onAddSubQuestion={onAddSubQuestion}
        onDeleteQuestion={onDeleteQuestion}
      />
    </div>
  );
}




