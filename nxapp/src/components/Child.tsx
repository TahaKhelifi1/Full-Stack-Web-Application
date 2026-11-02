"use client";

type ChildProps = {
  states: string[];
  onSelect: (state: string) => void;
};

export default function Child({ states, onSelect }: ChildProps) {
  return (
    <ul className="flex flex-wrap gap-2 p-4">
      {states.map((state) => (
        <li key={state}>
          <button
            onClick={() => onSelect(state)}
            className="px-3 py-1.5 text-sm rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors duration-200 font-medium"
          >
            {state}
          </button>
        </li>
      ))}
    </ul>
  );
}
