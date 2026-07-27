interface Props {
  open: boolean;
  children: React.ReactNode;
}

export default function Drawer({
  open,
  children,
}: Props) {
  return (
    <aside
      className={`fixed right-0 top-0 h-full w-[420px]
      bg-white shadow-xl transition-transform duration-300
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {children}
    </aside>
  );
}