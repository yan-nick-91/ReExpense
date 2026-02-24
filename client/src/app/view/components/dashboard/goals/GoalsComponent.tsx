// import React, { useState } from 'react';

import Button from '../../../UI/Button';

const MOCK_GOALS = [
  { id: '1', goal: 'Vacation to Spain', price: '876.51' },
  { id: '2', goal: 'Car', price: '1750.93' },
];

type Props = {
    onOpenGoalModal: () => void
}

export default function GoalsComponent({onOpenGoalModal}: Props) {
  //   const [goal, setGoals] = useState();



  return (
    <div className='flex flex-col'>
      <div className='flex justify-end p-4'>
        <Button theme='primary' onClick={onOpenGoalModal}>Add Goal</Button>
      </div>
      <div className='px-4 py-2 mt-3 h-30 overflow-y-scroll'>
        {MOCK_GOALS.length > 0 && (
          <ul>
            {MOCK_GOALS.map((g) => (
              <li key={g.id} className='mb-2'>
                <div className='flex flex-col'>
                  <h3>Goal: {g.goal}</h3>
                  <p>Price: {g.price}</p>
                </div>
                <div className='border border-gray-400' />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
