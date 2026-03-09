import type { GoalGeneral } from '../../../../types/goalTypes';
import { convertToDateAndTimeDisplay } from '../../../../utils/globalFunctions';

type Props = {
  goal: GoalGeneral;
};

export default function GoalItem({ goal }: Props) {
  const rowDisplay = (label: string, goalProp: string) => {
    return (
      <div className='grid grid-cols-3'>
        <strong>{label}:</strong>
        <div className='col-span-2'>{goalProp}</div>
      </div>
    );
  };

  return (
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
            `${convertToDateAndTimeDisplay(goal.updatedAt!)}`,
          )}
        </>
      )}
    </div>
  );
}
