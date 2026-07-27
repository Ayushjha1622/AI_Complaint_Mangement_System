interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "yellow" | "red" | "blue";
}

export default function Badge({
  children,
  color = "blue",
}: BadgeProps) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}