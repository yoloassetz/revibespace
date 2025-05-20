// components/FilterPanel.tsx
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const rewardOptions = [
  { label: "Any Reward", value: [0, Infinity] },
  { label: "₹0–200",      value: [0, 200] },
  { label: "₹200–500",    value: [200, 500] },
  { label: "₹500+",       value: [500, Infinity] },
];

export default function FilterPanel({
  onFilterChange,
}: {
  onFilterChange: (minReward: number, maxReward: number) => void;
}) {
  const [selected, setSelected] = useState(rewardOptions[0]);

  const handleSelect = (option: typeof rewardOptions[0]) => {
    setSelected(option);
    onFilterChange(option.value[0], option.value[1]);
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      <div className="relative w-48">
        <Listbox.Button className="w-full bg-white border px-3 py-2 rounded">
          {selected.label}
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 w-full bg-white shadow rounded">
            {rewardOptions.map((opt) => (
              <Listbox.Option key={opt.label} value={opt} className={({ active }) => `px-3 py-2 cursor-pointer ${active ? "bg-indigo-100" : ""}`}>
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}