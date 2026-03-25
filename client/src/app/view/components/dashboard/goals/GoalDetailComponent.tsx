import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../../../store/store';
import {
  deleteGoalController,
  getAllGoalsController,
} from '../../../../controllers/goalController';
import Button from '../../../UI/Button';
import GoalItem from './GoalItem';
import GoalFormModal from './GoalFormModal';
import GoalProgressComponent from './GoalProgressComponent';
import clsx from 'clsx';
import { getSavingByIdController } from '../../../../controllers/savingController';

export default function GoalDetailComponent() {
  const { savingId, goalId } = useParams<{
    savingId: string;
    goalId: string;
  }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goal = useSelector((state: RootState) =>
    state.goal.items.find((g) => g.id === goalId),
  );

  const [activeGoalModal, setActiveGoalModal] = useState(false);
  const [deleteWarningModal, setDeleteWarningModal] = useState(false);

  useEffect(() => {
    if (!savingId) return;
    getAllGoalsController(dispatch, savingId);
    getSavingByIdController(dispatch, savingId);
  }, [dispatch, savingId]);

  useEffect(() => {
    if (!goal) return;
    document.title = `ReExpense | Goal item: ${goal?.title}-${goal?.id.split('-')[0]}`;
  }, [goal]);

  const proceedDeletion = async () => {
    try {
      await deleteGoalController(dispatch, goal!.id);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!goal) {
    return (
      <>
        <h1>Goal not found</h1>
        <p>The requested goal was not found</p>
      </>
    );
  }

  if (!savingId) {
    return <p>Missing saving context</p>;
  }

  return (
    <>
      <section className='flex justify-center h-screen'>
        <div className='flex justify-items-start flex-col lg:flex-row border w-[90%] p-4 gap-8'>
          <article className='flex flex-col'>
            <h1 id='main-content' className='text-xl'>
              {goal.title}
            </h1>
            <div className='border border-gray-400' />
            <GoalItem goal={goal} />
            <div className='border border-gray-400' />
            <div className='flex flex-row gap-4 mt-4'>
              <Button theme='primary' onClick={() => setActiveGoalModal(true)}>
                Edit goal
              </Button>
              <Button
                theme='danger'
                onClick={() => setDeleteWarningModal(true)}
              >
                Delete goal
              </Button>
            </div>
          </article>
          <div>
            <GoalProgressComponent goalId={goal.id} />
          </div>
        </div>
      </section>
      {activeGoalModal && (
        <GoalFormModal
          selectedSavingId={savingId}
          onClose={() => setActiveGoalModal(false)}
          editGoal={goal}
          modalPurpose='edit'
        />
      )}
      {deleteWarningModal && (
        <section
          className={clsx(
            'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
          )}
        >
          <div className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'>
            <div className='mb-4'>
              <h2 className='font-bold'>Warning</h2>
              <br />
              <p>
                You are about to delete the goal item:{' '}
                <span className='font-bold'>{`${goal?.title}-${goal?.id.split('-')[0]}`}</span>
              </p>
              <br />
              <p>This action will not be reversible</p>
              <p>Are you sure you want to delete this item?</p>
            </div>
            <div className='flex gap-6'>
              <Button theme='primary' onClick={proceedDeletion}>
                Yes, delete item
              </Button>
              <Button
                theme='danger'
                onClick={() => setDeleteWarningModal(false)}
              >
                No, close window
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
