interface Props {
  name: string;
}

export default function Avatar({ name }: Props) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full
      bg-indigo-600 font-semibold text-white"
    >
      {name[0].toUpperCase()}
    </div>
  );
}