"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const QuestionMaker = ({quizId, questionMark}) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question_description: '',
        type: 'single',
        numericalAnswer: null,
        booleanAnswer: '',
        textAnswer: null,
        options: ['',''],
        correctAnswer: [],
        quizId: ''
    });

    const {score, negativeScore} = questionMark;

    // useEffect(()=>{
    //     score
    // },[])


    const handleAddOption = () => {
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            options: [...prevQuestion.options, '']
        }));
    };

    const handleDeleteOption = (index) => {
        setCurrentQuestion(prevQuestion => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions.splice(index, 1);
    
            // Ensure correctAnswer or numericalAnswer is consistent with question type
            const updatedCorrectAnswer = prevQuestion.correctAnswer.filter(answer => answer !== index);
            return { ...prevQuestion, options: updatedOptions, correctAnswer: updatedCorrectAnswer };
        });
    };
    

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prevQuestion => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions[index] = value;
            return { ...prevQuestion, options: updatedOptions };
        });
    };

    const handleNumericalChange = (e)=>{
        const { value } = e.target;
        setCurrentQuestion(prevQuestion => ({...prevQuestion, numericalAnswer: Number(value) }));
    };

    const handleBooleanChange = (value) => {
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            booleanAnswer: value
        }));
    };
    
    const handleCorrectAnswerChange = (index, isChecked) => {
        setCurrentQuestion(prevQuestion => {
            if (prevQuestion.type === 'single') {
                return { ...prevQuestion, correctAnswer: [index] };
            } else if (prevQuestion.type === 'multiple') {
                const updatedCorrectAnswers = isChecked
                    ? [...prevQuestion.correctAnswer, index]
                    : prevQuestion.correctAnswer.filter(answer => answer !== index);
                return { ...prevQuestion, correctAnswer: updatedCorrectAnswers };
            }
            return prevQuestion;
        });
    };
    

    const handleQuestionTypeChange = (e) => {
        const { value } = e.target;
        setCurrentQuestion(prevQuestion => {
            let updatedQuestion = { ...prevQuestion, type: value };
    
            if (value === 'multiple' || value === 'single') {
                updatedQuestion.options = ['', ''];
            }else{
                updatedQuestion.options = [];
            }
            
            if (value === 'boolean') {
                updatedQuestion.booleanAnswer = '';
            } else if (value === 'numerical') {
                updatedQuestion.numericalAnswer = '';
            }else if (value == "text"){
                updatedQuestion.textAnswer = '';
            }
    
            return updatedQuestion;
        });
    };
    

    const handleAddQuestion = () => {
        // setCurrentQuestion(prev => {...prev, quizId: quizId})
        setQuestions(prevQuestions => [
            ...prevQuestions,
            {
                ...currentQuestion,
                quizId: quizId,
                score: score,
                negativeScore: negativeScore
            }
        ]);

        setCurrentQuestion({
            question_description: '',
            type: 'single',
            numericalAnswer: null,
            booleanAnswer: '',
            textAnswer: null,
            options: ['',''],
            correctAnswer: []
        });
    };

    const handleSubmit = async ()=>{
        try {
            const response = await axios.post(`/api/quizzes/${quizId}/questions`, {
                questionDataArray: questions,
            });

            if(response){
                alert("Quiz Created successfully!");
                setQuestions([]);
                setCurrentQuestion({
                    question_description: '',
                    type: 'single',
                    numericalAnswer: null,
                    booleanAnswer: '',
                    textAnswer: null,
                    options: ['',''],
                    correctAnswer: []
                });
            }

            console.log("response ", response.data);

            window.location.href = '/quizzes';
          } catch (error) {
            alert("error is occur");
            console.error("Error Initializing Quiz:", error);
          }
    }

    useEffect(()=>{
        console.log(questions);
    },[questions])

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Question Maker</h1>

            {questions.map((question, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg">
                    <h3 className="font-medium">{index + 1}. {question.question_description}</h3>
                    <p>Question Type: {question.type}</p>
                    <ul>
                        {question.options.map((option, optIndex) => (
                            <li key={optIndex}>{option}</li>
                        ))}
                         <li>{question.numericalAnswer}</li>
                         <li>{question.booleanAnswer}</li>
                         <li>{question.textAnswer}</li>
                    </ul>
                </div>
            ))}

            <div className="border border-gray-300 p-4 mb-4 rounded-lg">
                <label className="block mb-2 font-medium">Question Description:</label>
                <input
                    type="text"
                    value={currentQuestion.question_description}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question_description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />

                <label className="block mb-2 font-medium">Question Type:</label>
                <select
                    value={currentQuestion.type}
                    onChange={handleQuestionTypeChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="numerical">Numerical</option>
                    <option value="boolean">Boolean</option>
                </select>

                {(currentQuestion.type === 'multiple' || currentQuestion.type === 'single') && (
                    <div>
                        <label className="block mb-2 font-medium">Options:</label>
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type={currentQuestion.type === 'single' ? 'radio' : 'checkbox'}
                                    name={`correctAnswer${questions.length}`}
                                    // checked={currentQuestion.correctAnswer.includes(index.toString())}
                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.checked)}
                                    className="mr-2"
                                />
                                <input
                                    type={'text'}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="mr-2"
                                />
                                 <button
                                    type="button"
                                    onClick={()=>handleDeleteOption(index)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    - Delete Option
                                </button>
                            </div>
                            
                        ))}
                                <button
                                    type="button"
                                    onClick={handleAddOption}
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                                >
                                    + Add Option
                                </button>
                    </div>
                )}

                {currentQuestion.type === 'numerical' && (
                    <div>
                        <label className="block mb-2 font-medium">Correct Number:</label>
                        <input
                            type="number"
                            value={currentQuestion.numericalAnswer}
                            onChange={handleNumericalChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </div>
                )}

                {currentQuestion.type === 'boolean' && (
                    <div>
                        <label className="block mb-2 font-medium">Correct Answer:</label>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="booleanCorrectAnswer"
                                value="true"
                                // checked={currentQuestion.correctAnswer === 'true'}
                                onChange={() => handleBooleanChange('true')}
                                className="mr-2"
                            />
                            <label className="mr-4">True</label>
                            <input
                                type="radio"
                                name="booleanCorrectAnswer"
                                value="false"
                                // checked={currentQuestion.correctAnswer === 'false'}
                                onChange={() => handleBooleanChange('false')}
                                className="mr-2"
                            />
                            <label>False</label>
                        </div>
                    </div>
                )}


                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                    Add Question
                </button>
            </div>

            <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                    Submit
                </button>
        </div>
    );
};

export default QuestionMaker;
