import Button from '../../../UI/Button';
// import ProgressCircle from '../../../UI/ProgressCircle';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../../store/store';

type Props = {
  onOpenModal: () => void;
  goalId: string;
  goalPrice: number;
};

export default function GoalProgressComponent({
  onOpenModal,
  goalId,
  goalPrice,
}: Props) {
  console.log(goalId)
  // const goals = useSelector((state: RootState) =>
  //   state.goal.items
  // );

  // const savingsGoal = goalPrice ?? 0;
  // // const totalSavings = ;

  // const progressPercentage = Math.min(
  //   Math.max(Math.round((totalSavings / savingsGoal) * 100 * 100) / 100, 0),
  //   100,
  // );

  const rowDisplay = (label: string, goalProp: number) => {
    return (
      <div className='grid grid-cols-3'>
        <strong>{label}:</strong>
        <div className='col-span-2 ml-3'>{goalProp.toFixed(2)}</div>
      </div>
    );
  };
  return (
    <>
      <h2>Progress</h2>
      {rowDisplay('Savings goal', goalPrice)}
      {/* {rowDisplay('Savings in amount', totalSavings)} */}
      {/* <ProgressCircle percentage={progressPercentage} /> */}
      <Button theme='primary' onClick={onOpenModal}>
        Add savings
      </Button>
    </>
  );
}
