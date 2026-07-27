interface ProgressProps {
  value: number;
}

export default function Progress({
  value,
}: ProgressProps) {
  return (
    <div className="h-2 rounded-full bg-slate-200">
      <div
        className="h-2 rounded-full bg-indigo-600 transition-all"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}