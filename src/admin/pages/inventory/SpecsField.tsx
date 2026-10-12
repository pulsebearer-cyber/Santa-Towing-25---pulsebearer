import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SpecItem } from '@/data/inventoryDefaults';

interface SpecsFieldProps {
  label: string;
  specs: SpecItem[];
  onChange: (specs: SpecItem[]) => void;
  helpText?: string;
}

export default function SpecsField({
  label,
  specs = [],
  onChange,
  helpText,
}: SpecsFieldProps) {
  const handleAdd = () => {
    onChange([...specs, { label: '', value: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(specs.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, key: 'label' | 'value', val: string) => {
    const copy = [...specs];
    copy[index] = { ...copy[index], [key]: val };
    onChange(copy);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-800">{label}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="min-h-[36px] px-3 py-1 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Spec Row</span>
        </button>
      </div>

      {specs.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No specifications defined. Click above to add.</p>
      ) : (
        <div className="space-y-2">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
                placeholder="Specification name (e.g., Voltage, Engine)"
                className="w-1/2 min-h-[40px] px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleUpdate(idx, 'value', e.target.value)}
                placeholder="Value (e.g., 12V, 2.0L Turbo)"
                className="w-1/2 min-h-[40px] px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Remove spec"
                className="p-2 text-slate-400 hover:text-red-600 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {helpText && <p className="text-xs text-slate-500 leading-relaxed">{helpText}</p>}
    </div>
  );
}
