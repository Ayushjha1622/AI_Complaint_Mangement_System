interface Props {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export default function Tabs({
  tabs,
  active,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`border-b-2 px-4 py-2 ${
            active === tab
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}