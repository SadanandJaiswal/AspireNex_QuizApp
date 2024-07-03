import React, { useState, useEffect } from 'react';

const QuizQuestions = ({ quizQuestionData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [answers, setAnswers] = useState([]); 
  const [currentQuestionType, setCurrentQuestionType] = useState('single');
  const [selectedValues, setSelectedValues] = useState([]);
  const [numericalAnswer, setNumericalAnswer] = useState(0);



  useEffect(() => {
    if (quizQuestionData && quizQuestionData.length > 0) {
      setCurrentQuestionIndex(0); // Set initial question index to 0 when quizQuestionData updates
    }
    setAnswers(new Array(quizQuestionData.length).fill({}));
  }, [quizQuestionData]);

  useEffect(()=>{
    if(quizQuestionData && quizQuestionData.length > 0){
      setCurrentQuestionType(quizQuestionData[currentQuestionIndex].type);
    }
    setSelectedValues([])
  },[currentQuestionIndex])

  // useEffect(()=>{
  //   console.log("answer is here ", answers)
  // },[answers])

  // useEffect(()=>{
  //   console.log("selectedanswer is here ", selectedValues)
  // },[selectedValues])
  
  // useEffect(()=>{
  //   console.log("selectedanswer is here ", numericalAnswer)
  // },[numericalAnswer])

  const goToNextQuestion = () => {

    const updatedAnswers = [...answers];

    let ansSelected;
    if(currentQuestionType === 'numerical'){
      ansSelected = [numericalAnswer];
    }else{
      ansSelected = selectedValues;
    }

    updatedAnswers[currentQuestionIndex] = {
      quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
      selectedAnswer: ansSelected, // Replace with your selectedAnswer field or structure
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
      // console.log("End of quiz questions reached");
      // Optionally, handle end of quiz logic (e.g., submit answers)
    }

  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (selectedAnswer) => {
    // Update answers array with selected answer for current question
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
      selectedAnswer, // Replace with your selectedAnswer field or structure
    };
    setAnswers(updatedAnswers);
  };

  const handleOptionChange = (event)=>{
    const { type, value, checked } = event.target;

    if (type === 'checkbox') {
      if (checked) {
        setSelectedValues((prevValues) => [...prevValues, value]);
      } else {
        setSelectedValues((prevValues) => prevValues.filter((val) => val !== value));
      }
    } else if (type === 'radio' || type === 'number') {
      setSelectedValues([value]);
    }
    // if(currentQuestionType==='single' || currentQuestionType==='multiple' || currentQuestionType==='boolean' ){
    // }
    // else if(currentQuestionType==='numerical'){

    // }
  }

  const handleNumericalOption = (e)=>{
    setNumericalAnswer(e.target.value);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
      selectedAnswer: [numericalAnswer], // Replace with your selectedAnswer field or structure
    };
    setAnswers(updatedAnswers);
  }

  // const handleOptionChange = (index, isChecked, optionIndex) => {
  //   console.log(index, isChecked, optionIndex);
  //   console.log(quizQuestionData[currentQuestionIndex]._id);
  //   console.log(currentQuestionType)
  //   setAnswers((prevAnswers) => {
  //     // const currentQuestionType = quizQuestionData[currentQuestionIndex].questionType;
  
  //     if (currentQuestionType === 'single') {
  //       return [
  //         ...prevAnswers,
  //         {
  //           quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
  //           selectedAnswer: [optionIndex],
  //         },
  //       ];
  //     } else if (currentQuestionType === 'multiple') {
  //       const updatedSelectedAnswers = isChecked
  //         ? [...prevAnswers[index].selectedAnswer, optionIndex]
  //         : prevAnswers[index].selectedAnswer.filter((ans) => ans !== optionIndex);
  
  //       return prevAnswers.map((answer, idx) =>
  //         idx === index
  //           ? {
  //               quizQuestionId: quizQuestionData[currentQuestionIndex]._id, // Replace with your quizQuestionId field
  //               selectedAnswer: updatedSelectedAnswers,
  //             }
  //           : answer
  //       );
  //     }
  
  //     return prevAnswers; // Return previous state if neither single nor multiple
  //   });
  // };
  

  const handleSubmit = ()=>{
    console.log('answer are here ', answers);
  }

  // Render component UI
  return (
    <div className="w-full flex">
      <div className="w-1/4 border-2 p-4">
        {/* Sidebar for displaying question numbers */}
        <div className="flex flex-col space-y-4">
          {quizQuestionData.map((question, index) => (
            <div
              key={question._id} // Replace with your unique key
              className={`p-2 cursor-pointer ${
                index === currentQuestionIndex ? 'bg-gray-200' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              Question {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 border p-4">
        {/* Main section for displaying current question */}
        {quizQuestionData.length > 0 && (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                Question {currentQuestionIndex + 1}: and type is {quizQuestionData[currentQuestionIndex].type}
              </div>
              <div className="flex items-center space-x-4">
                {/* Score */}
                <div className="text-green-500">Score: {quizQuestionData[currentQuestionIndex].score}</div>
                {/* Negative Score */}
                <div className="text-red-500">Negative Score: {quizQuestionData[currentQuestionIndex].negativeScore}</div>
              </div>
            </div>
            <div className="mb-4">{quizQuestionData[currentQuestionIndex].question_description}</div>
           
            <div className="space-y-4">
              {(currentQuestionType === 'single' ) && quizQuestionData[currentQuestionIndex].options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type={currentQuestionType === 'single' ? 'radio' : 'checkbox'}
                    name={`question_${currentQuestionIndex}_options`}
                    value={optionIndex}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
              {( currentQuestionType === 'multiple') && quizQuestionData[currentQuestionIndex].options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type={currentQuestionType === 'single' ? 'radio' : 'checkbox'}
                    name={`question_${currentQuestionIndex}_options`}
                    value={optionIndex}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
              {currentQuestionType === 'boolean' &&
                <div className="">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}_options`}
                      value={"true"}
                      // checked={
                      //   currentQuestionType === 'single'
                      //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                      //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                      // }
                      onChange={handleOptionChange}
                    />
                    <label>True</label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}_options`}
                      value={"false"}
                      // checked={
                      //   currentQuestionType === 'single'
                      //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                      //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                      // }
                      onChange={handleOptionChange}
                    />
                    <label>False</label>
                  </div>
                </div>
              }
              {currentQuestionType === 'numerical' &&
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                  <input
                    type="number"
                    name={`question_${currentQuestionIndex}_options`}
                    value={numericalAnswer}
                    // checked={
                    //   currentQuestionType === 'single'
                    //     ? answers[currentQuestionIndex]?.selectedAnswer === optionIndex
                    //     : answers[currentQuestionIndex]?.selectedAnswer.includes(optionIndex)
                    // }
                    onChange={handleNumericalOption}
                  />
                  {/* <label>True</label> */}
                </div>
              }
            </div>
            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                // disabled={currentQuestionIndex === quizQuestionData.length - 1}
              >
                {currentQuestionIndex<quizQuestionData.length-1 ?  'Save & Next' : 'Save'}
              </button>
            </div>
          </div>
        )}
        <div className="w-full">
        <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
