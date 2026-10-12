import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface StringListFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  helpText?: string;
}

export default function StringListField({
  label,
  items = [],
  onChange,
  placeholder = 'Add new item...',
  addLabel = 'Add Item',
  helpText,
}: StringListFieldProps) {
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, val: string) => {
    const copy = [...items];
    copy[index] = val;
    onChange(copy);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-800">{label}</label>
        <span className="text-xs text-slate-400 font-mono">{items.length} items</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-h-[40px] px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center gap-1 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addLabel}</span>
        </button>
      </div>

      {items.length > 0 && (
        <ul className="space-y-2" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-xs w-4 text-center font-mono">{idx + 1}</span>
              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdate(idx, e.target.value)}
                className="flex-1 text-xs text-slate-800 bg-transparent border-0 focus:bg-white focus:border focus:border-[#015557] rounded px-2 py-1 transition-all focus-visible:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Remove item"
                className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {helpText && <p className="text-xs text-slate-500 leading-relaxed">{helpText}</p>}
    </div>
  );
}
