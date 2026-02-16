export default function IncomeTransaction() {
  return (
    <>
      <div className='flex flex-col mb-4'>
        <label htmlFor='amount of income currency' className='mb-2'>Amount of income currency:</label>
        <input
          className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
          type='text'
          id='amount of income currency'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='category' className='mb-2'>Category:</label>
        <input
          className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
          type='text'
          id='category'
        />
      </div>
    </>
  );
}
