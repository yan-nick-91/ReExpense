import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import ProgressCircle from '../../../UI/ProgressCircle';

type Props = {
  goalId: string;
};

export default function GoalProgressComponent({ goalId }: Props) {
  const goals = useSelector((state: RootState) => state.goal.items);
  const saving = useSelector((state: RootState) => state.saving.item);
  const loading = useSelector((state: RootState) => state.saving.loading);

  const getGoalTargetAmount = () => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return 0.0;
    return goal.targetAmount;
  };

  const rowDisplay = (label: string, goalProp: number) => {
    return (
      <div className='grid grid-cols-3'>
        <strong>{label}:</strong>
        <div className='col-span-2 ml-3'>{goalProp.toFixed(2)}</div>
      </div>
    );
  };

  if (loading || saving === undefined) {
    return <p>Loading progress...</p>;
  }

  if (!saving) {
    return <p>No Saving found...</p>;
  }

  const progressPercentage = Math.min(
    Math.max(
      Math.round((saving.balance / getGoalTargetAmount()) * 100 * 100) / 100,
      0,
    ),
    100,
  );

  return (
    <>
      <h2>Progress</h2>
      {rowDisplay('Target amount for goal', getGoalTargetAmount())}
      {rowDisplay(`Amount in ${saving.name}`, saving.balance ?? 0.0)}
      <div className='flex justify-center sm:mt-10'>
        <div className='max-w-80 sm:mt-10 lg:max-w-220'>
          <ProgressCircle
            percentage={progressPercentage}
            title={`Circle percentage for goal is on ${progressPercentage}%`}
          />
        </div>
      </div>
    </>
  );
}
