import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../UI/Button';
import type { RootState } from '../../../../store/store';
import { getAllGoalsController } from '../../../../controllers/goalController';
import { convertToDateAndTimeDisplay } from '../../../../utils/globalFunctions';

type Props = {
  selectedSavingId: string;
  onOpenGoalModal: () => void;
};

export default function GoalsComponent({ onOpenGoalModal, selectedSavingId }: Props) {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goal.items);

  useEffect(() => {
    getAllGoalsController(dispatch, selectedSavingId);
  }, [dispatch, selectedSavingId]);

  const itemDateDisplay = (label: string, dateValue: string) => {
    return (
      <div>
        <span>{label}: </span>
        <time dateTime={dateValue}>
          {convertToDateAndTimeDisplay(dateValue)}
        </time>
      </div>
    );
  };

  const itemDetailDisplay = (label: string, detailString: string) => {
    return (
      <div>
        <span>{label}: </span>
        <span>{detailString}</span>
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end p-4'>
        <Button theme='primary' onClick={onOpenGoalModal}>
          Add goal
        </Button>
      </div>
      <div className='px-4 py-2 mt-3 h-40 overflow-y-scroll'>
        {goals.length > 0 && (
          <ul>
            {goals.map((goal) => (
              <li key={goal.id} className='mb-2'>
                <div className='flex flex-col md:flex-row md:items-center justify-between p-2'>
                  <div className='mb-2 md:mb-0'>
                    <h3>Goal: {goal.title}</h3>
                    {itemDateDisplay('Created at', goal.createdAt)}
                    {goal.updatedAt &&
                      itemDateDisplay('Updated at', goal.updatedAt)}

                    {itemDetailDisplay('Target amount', String(goal.targetAmount))}
                    {itemDetailDisplay(
                      'Description',
                      goal.description || 'No Details',
                    )}
                  </div>
                  <div className='flex lg:justify-end'>
                    <Button navigateTo={`/goals/${goal.savingId}/${goal.id}`} theme='primary'>
                      View goal
                    </Button>
                  </div>
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
