interface Props {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({
  text,
  children,
}: Props) {
  return (
    <div className="group relative inline-flex">
      {children}

      <span
        className="absolute bottom-full left-1/2 hidden
        -translate-x-1/2 rounded-lg bg-slate-900
        px-3 py-2 text-xs text-white
        group-hover:block"
      >
        {text}
      </span>
    </div>
  );
}