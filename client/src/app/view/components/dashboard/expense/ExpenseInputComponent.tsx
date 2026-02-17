type Props = {
  labelId: string;
  labelText: string;
};

export default function ExpenseInputComponent({
  labelId,
  labelText,
}: Props) {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={labelId} className='mb-2'>
        {labelText}:
      </label>
      <input
        className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
        type='number'
        id={labelId}
      />
    </div>
  );
}
