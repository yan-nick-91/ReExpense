type Props = {
  percentage: number;
  title?: string;
};

export default function ProgressCircle({ percentage, title }: Props) {
  const radius = 42;
  const strokeWith = 10;
  const circumference = 2 * Math.PI * radius;

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (clampedPercentage / 100) * circumference;
  return (
    <div className='relative w-full aspect-square'>
      <svg
        role='img'
        viewBox='0 0 100 100'
        className='w-full h-full -rotate-90'
        aria-label={title}
      >
        <title>{title}</title>
        <circle
          cx='50'
          cy='50'
          r={radius}
          strokeWidth={strokeWith}
          className='stroke-gray-200 fill-transparent'
        />
        <circle
          cx='50'
          cy='50'
          r={radius}
          strokeWidth={strokeWith}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className='stroke-blue-500 fill-transparent transition-all duration-500 ease-out'
          strokeLinecap='round'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center font-semibold text-lg'>
        {percentage}%
      </div>
    </div>
  );
}
