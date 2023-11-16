import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AccordionIcon } from '../accordionIcon';

export const QuestionListItem = ({
	questions,
	open,
	handleOpen,
	handleSubQuestions,
	onEditQuestion,
	onAddSubQuestion,
	onDeleteQuestion,
}) => {
	return (
		<ul className="list-decimal pl-5" >
			{
				!!questions?.length && questions.map((question) => {
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
											return (
												<div
													key={item._id}
													className="flex items-center"
												>
													<label
														htmlFor={`question-${question._id}-answer-${item._id}`}
														className="flex w-full cursor-pointer items-center px-3 py-2"
													>
														<Radio
															id={`question-${question._id}-answer-${item._id}`}
															ripple={false}
															color="green"
															className="hover:before:opacity-0"
															defaultChecked={item.isCorrect}
														/>
														<Typography color="blue-gray" className="">
															{item.answer}
														</Typography>
													</label>
												</div>
											)
										})
									}
									<div className="flex justify-end">
										<div className="flex">
											{
												!!question.hasChild && (
													<Button
														variant="text"
														color="gray"
														size="sm"
														className="flex font-semibold items-center gap-2 mr-1"
														onClick={() => handleSubQuestions(question._id)}
													>
														See sub֊questions
													</Button>
												)
											}
											<Button
												color="blue"
												size="sm"
												onClick={() => onEditQuestion(question)}
											>
												Edit
											</Button>
											<Button
												color="blue"
												size="sm"
												className="mx-2"
												onClick={() => onAddSubQuestion(question._id)}
											>
												Add sub֊question
											</Button>
											<Button
												color="red"
												size="sm"
												onClick={() => onDeleteQuestion(question._id)}
											>
												Delete question
											</Button>
										</div>
									</div>
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
														handleOpen={handleOpen}
														handleSubQuestions={handleSubQuestions}
														onEditQuestion={onEditQuestion}
														onAddSubQuestion={onAddSubQuestion}
														onDeleteQuestion={onDeleteQuestion}
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

