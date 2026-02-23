import type { ChangeEvent } from "react";

type Props = {
  labelId: string;
  labelText: string;
  name: string;
  type: 'text' | 'number';
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function ExpenseInputComponent({
  labelId,
  labelText,
  name,
  type,
  value,
  onChange
}: Props) {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={labelId} className='mb-2'>
        {labelText}
      </label>
      <input
        className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
        id={labelId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
