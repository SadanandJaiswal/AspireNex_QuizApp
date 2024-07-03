const QuizListCard = ({ title, deadline, duration, totalScore }) => {
  return (
      <div className='md:flex'>
        <div className='px-8 py-4 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-indigo-600'>{title}</h2>
            <div className='text-gray-600 text-sm'>
              <p className="text-green-500 font-bold">{totalScore} Marks</p>
            </div>
          </div>
          <div className='flex justify-between text-gray-700 text-md'>
            <div>
              <p><span className='font-semibold'>Duration:</span> {duration} mins</p>
            </div>
            {deadline && 
              <div>
                <p><span className='font-semibold'>Deadline:</span> {deadline}</p>
              </div>
            }
          </div>
        </div>
      </div>
  );
};

export default QuizListCard;
