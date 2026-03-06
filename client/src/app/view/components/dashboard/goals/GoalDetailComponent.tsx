import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../../store/store';
import { getAllGoalsController } from '../../../../controllers/goalController';
import { convertToDateAndTimeDisplay } from '../../../../utils/globalFunctions';
import Button from '../../../UI/Button';

export default function GoalDetailComponent() {
  const { goalId } = useParams<{ goalId: string }>();
  const dispatch = useDispatch();

  const goal = useSelector((state: RootState) =>
    state.goal.items.find((g) => g.id === goalId),
  );

  useEffect(() => {
    if (!goal) {
      getAllGoalsController(dispatch);
    }
  }, [dispatch, goal]);

  useEffect(() => {
    document.title = `ReExpense | Goal item: ${goal?.title}-${goal?.id.split('-')[0]}`;
  });

  if (!goal) {
    return (
      <div>
        <h1>Goal not found</h1>
        <p>The requested goal was not found</p>
      </div>
    );
  }

  const rowDisplay = (label: string, goalProp: string) => {
    return (
      <div className='grid grid-cols-3'>
        <strong>{label}:</strong>
        <div className='col-span-2'>{goalProp}</div>
      </div>
    );
  };

  return (
    <section className='flex justify-center h-screen'>
      <div className='flex justify-items-start border w-[90%] p-4'>
        <article className='flex flex-col'>
          <h1 className='text-xl'>{goal.title}</h1>
          <div className='border border-gray-400' />
          <div className='mb-8'>
            {rowDisplay('ID', goal.id)}
            {rowDisplay('Description', `${goal.description || 'No details'}`)}
            {rowDisplay(
              'Created at',
              `${convertToDateAndTimeDisplay(goal.createdAt)}`,
            )}
            {goal.updatedAt && (
              <>
                {rowDisplay(
                  'Updated at',
                  `${convertToDateAndTimeDisplay(goal.updatedAt)}`,
                )}
              </>
            )}
          </div>
          <div className='border border-gray-400' />
          <div className='flex flex-row gap-4 mt-4'>
            <Button theme='primary'>Edit goal</Button>
            <Button theme='danger'>Delete goal</Button>
          </div>
        </article>
      </div>
    </section>
  );
}
