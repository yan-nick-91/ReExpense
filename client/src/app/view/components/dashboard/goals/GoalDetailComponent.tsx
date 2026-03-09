import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../../store/store';
import { getAllGoalsController } from '../../../../controllers/goalController';
import Button from '../../../UI/Button';
import GoalItem from './GoalItem';
import GoalFormModal from './GoalFormModal';

export default function GoalDetailComponent() {
  const { goalId } = useParams<{ goalId: string }>();
  const dispatch = useDispatch();

  const goal = useSelector((state: RootState) =>
    state.goal.items.find((g) => g.id === goalId),
  );

  const [activeGoalModal, setActiveGoalModal] = useState(false);

  useEffect(() => {
    if (!goal) {
      getAllGoalsController(dispatch);
    }
  }, [dispatch, goal]);

  useEffect(() => {
    document.title = `ReExpense | Goal item: ${goal?.title}-${goal?.id.split('-')[0]}`;
  });

  const openGoalModal = () => {
    setActiveGoalModal(true);
  };

  const closeGoalModal = () => setActiveGoalModal(false);


  if (!goal) {
    return (
      <>
        <h1>Goal not found</h1>
        <p>The requested goal was not found</p>
      </>
    );
  }

  return (
    <>
      <section className='flex justify-center h-screen'>
        <div className='flex justify-items-start border w-[90%] p-4'>
          <article className='flex flex-col'>
            <h1 className='text-xl'>{goal.title}</h1>
            <div className='border border-gray-400' />
            <GoalItem goal={goal} />
            <div className='border border-gray-400' />
            <div className='flex flex-row gap-4 mt-4'>
              <Button theme='primary' onClick={openGoalModal}>Edit goal</Button>
              <Button theme='danger'>Delete goal</Button>
            </div>
          </article>
        </div>
      </section>
      {activeGoalModal && <GoalFormModal onClose={closeGoalModal} editGoal={goal} modalPurpose='edit'/>}
    </>
  );
}
