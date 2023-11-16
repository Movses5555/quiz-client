import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AccordionIcon } from './accordionIcon';

export const QuestionListItem = ({
  questions,
  open,
  selectedData,
  savingQuestionID,
  saveQuestionLoading,
  handleOpen,
  onChangeAnswer,
  onSaveAnswer,
}) => {
  return (
    <ul className="list-decimal pl-5">
      {
        !!questions?.length && questions.map((question) => {
          const questionAnswer = selectedData.find(answer => answer.questionID === question._id);
          return (
            <li>
              <Accordion
                key={question._id}
                open={ open.includes(question._id) }
								icon={<AccordionIcon id={question._id} open={open.includes(question._id) ? question._id : null} />}
              >
                <AccordionHeader
                  onClick={() => handleOpen(question._id)}
                >
                  <Typography color="blue-gray" className="font-bold">
                    {question.question}
                  </Typography>
                </AccordionHeader>
                <AccordionBody>
                  {
                    question.answers.map(item => {
                      let isChecked = !!questionAnswer && questionAnswer.answerID === item._id;
                      let radioColor = "green";
                      if(question.correctAnswerId &&  question.correctAnswerId !== item._id) {
                        radioColor = 'red'
                      }
                      if(!isChecked && question.answered && question.correctAnswerId === item._id) {
                        isChecked = true;
                      }
                      return (
                        <div
                          key={item._id}
                          className="flex items-center"
                        >
                          <label
                            htmlFor={`question-${question._id}-answer-${item._id}`}
                            className="flex w-full cursor-pointer items-center py-2"
                          >
                            <Radio
                              id={`question-${question._id}-answer-${item._id}`}
                              ripple={false}
                              color={radioColor}
                              className="hover:before:opacity-0"
                              checked={isChecked}
                              disabled={!!question.answered}
                              onChange={(e) => {
                                onChangeAnswer(question._id, item._id);
                              }}
                            />
                            <Typography color="blue-gray" className="">
                              {item.answer}
                            </Typography>
                          </label>
                        </div>
                      )
                    })
                  }
                  {
                    !question.answered && (
                      <div className="flex justify-end my-2">
                        <Button
                          color="blue"
                          size="sm"
                          className="mr-2"
                          disabled={!questionAnswer || (!!saveQuestionLoading && savingQuestionID === question._id)}
                          onClick={() => onSaveAnswer(question._id)}
                        >
                          Save answer
                        </Button>
                      </div>
                    )
                  }
                  <div className="flex">
                    {
                      !!question.hasChild && !!question.subQuestions?.length && (
                        <div className="w-full mt-4">
                          <Typography variant="h4" color="blue-gray" className="">
                            Sub-questions
                          </Typography>
                          <QuestionListItem
                            questions={question.subQuestions}
                            open={open}
                            selectedData={selectedData}
                            saveQuestionLoading={saveQuestionLoading}
                            handleOpen={handleOpen}
                            onChangeAnswer={onChangeAnswer}
                            onSaveAnswer={onSaveAnswer}
                          />
                        </div>
                      )
                    }
                  </div>
                </AccordionBody>
              </Accordion>
            </li>
          )
        })
      }
    </ul>
  )
}




