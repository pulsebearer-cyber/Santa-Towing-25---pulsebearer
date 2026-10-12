import React, { useState } from 'react';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Plus, Edit2 } from 'lucide-react';
import { ReorderableItem } from '../types';
import ConfirmDialog from './ConfirmDialog';

interface ReorderableListProps {
  items: ReorderableItem[];
  onChange: (items: ReorderableItem[]) => void;
  onAddItem?: () => void;
  onEditItem?: (item: ReorderableItem) => void;
  title?: string;
  addLabel?: string;
  className?: string;
}

export default function ReorderableList({
  items,
  onChange,
  onAddItem,
  onEditItem,
  title,
  addLabel = 'Add item',
  className = '',
}: ReorderableListProps) {
  const [deletePendingItem, setDeletePendingItem] = useState<ReorderableItem | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  const handleConfirmDelete = () => {
    if (!deletePendingItem) return;
    const newItems = items.filter((it) => it.id !== deletePendingItem.id);
    onChange(newItems);
    setDeletePendingItem(null);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        {title && (
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        )}
        {onAddItem && (
          <button
            type="button"
            onClick={onAddItem}
            className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          >
            <Plus className="w-3.5 h-3.5" />
            {addLabel}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <p className="text-sm text-slate-500">No items in the list</p>
          {onAddItem && (
            <button
              type="button"
              onClick={onAddItem}
              className="mt-2 text-xs font-semibold text-[#015557] hover:underline"
            >
              Add the first item
            </button>
          )}
        </div>
      ) : (
        <ul className="space-y-2" role="list">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.id}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Visual drag handle / order number */}
                <div className="flex items-center gap-1 text-slate-400 pl-1 shrink-0">
                  <GripVertical className="w-4 h-4 cursor-grab" aria-hidden="true" />
                  <span className="text-xs font-mono tabular-nums font-semibold text-slate-400 w-4 text-center">
                    {index + 1}
                  </span>
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 px-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {(item.subtitle || item.meta) && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {item.subtitle || item.meta}
                    </p>
                  )}
                </div>

                {/* Move Actions (touch friendly min 40px) */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveItem(index, 'up')}
                    aria-label={`Move ${item.title} up`}
                    title="Move up"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveItem(index, 'down')}
                    aria-label={`Move ${item.title} down`}
                    title="Move down"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {onEditItem && (
                    <button
                      type="button"
                      onClick={() => onEditItem(item)}
                      aria-label={`Edit ${item.title}`}
                      title="Edit item"
                      className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setDeletePendingItem(item)}
                    aria-label={`Delete ${item.title}`}
                    title="Delete item"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d80000]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Confirmation Dialog before deleting item */}
      <ConfirmDialog
        isOpen={!!deletePendingItem}
        title="Remove Item?"
        description={`Are you sure you want to remove "${deletePendingItem?.title}"? This item will be removed from the list.`}
        confirmLabel="Remove item"
        cancelLabel="Keep item"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePendingItem(null)}
      />
    </div>
  );
}
