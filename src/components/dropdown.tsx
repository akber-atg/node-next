import dropdownItems from "../static_data/dropdown.json";
import  '../components/dropdown.css';
import { useState, useEffect } from "react";

export type Item = {
  id: string;
  name: string;
  category: "electronics" | "books" | "apparel" | "home";
  price: number;
};

interface CategoryDropdownProps {
  category: string;
  onSelect?: (item: Item|null) => void;
  variant?: "dropdown-modern" | "dropdown-dark";
}

export function Dropdown({ category, onSelect,variant = "dropdown-modern" }: CategoryDropdownProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = dropdownItems.filter(
      (item) => item.category === category,
    ) as Item[];

    setItems(fetchItems);
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedItem(items.find((item) => item.id === value) || null);
    onSelect?.(items.find((item) => item.id === value) || null);
  };
  
  return (
    <select
    className={variant}
      value={selectedItem?.id ?? ""}
      onChange={(e) => handleChange(e)}
    >
      <option value="">Select an item</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
