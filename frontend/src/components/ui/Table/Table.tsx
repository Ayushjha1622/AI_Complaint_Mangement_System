import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

export default function Table<T>({
  columns,
  data,
}: Props<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.header}
              className="border-b px-4 py-3 text-left"
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="border-b"
          >
            {columns.map((c) => (
              <td
                key={c.header}
                className="px-4 py-3"
              >
                {c.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}