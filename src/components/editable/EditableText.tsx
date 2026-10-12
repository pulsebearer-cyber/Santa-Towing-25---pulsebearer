import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { useContent, useContentManager } from '@/context/ContentContext';
import { cn } from '@/lib/utils';

export interface EditableTextProps {
  storageKey: string;
  defaultContent?: string;
  as?: React.ElementType;
  className?: string;
  multiline?: boolean;
  label?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function EditableText({
  storageKey,
  defaultContent = '',
  as: Component = 'span',
  className = '',
  multiline = false,
  label,
  children,
  style,
}: EditableTextProps) {
  const { isEditMode, recordChange } = useEditMode();
  const { set } = useContentManager();

  const fallback = defaultContent || (typeof children === 'string' ? children : '');
  const storedValue = useContent<string>(storageKey, fallback);
  const textValue = typeof storedValue === 'string' ? storedValue : String(storedValue ?? '');

  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const initialTextOnEditStart = useRef<string>(textValue);

  // Keep DOM content in sync with stored value when not editing
  useEffect(() => {
    if (!isEditing && elementRef.current) {
      if (elementRef.current.innerText !== textValue) {
        elementRef.current.innerText = textValue;
      }
    }
  }, [textValue, isEditing]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isEditMode) {
        e.preventDefault();
        e.stopPropagation();

        if (!isEditing) {
          setIsEditing(true);
          initialTextOnEditStart.current = elementRef.current?.innerText ?? textValue;
          setTimeout(() => {
            if (elementRef.current) {
              elementRef.current.focus();
              // Select all content or move cursor to end
              const range = document.createRange();
              range.selectNodeContents(elementRef.current);
              const selection = window.getSelection();
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }
          }, 0);
        }
      }
    },
    [isEditMode, isEditing, textValue]
  );

  const handleBlur = useCallback(() => {
    if (!isEditing) return;
    setIsEditing(false);

    const newRawText = elementRef.current?.innerText ?? '';
    const cleanText = newRawText.replace(/\r\n/g, '\n').trimEnd();
    const prevText = initialTextOnEditStart.current;

    if (cleanText !== prevText) {
      set(storageKey, cleanText);
      recordChange(storageKey, prevText, cleanText, 'text');
    }
  }, [isEditing, set, storageKey, recordChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Cancel changes: restore initial text and blur
        if (elementRef.current) {
          elementRef.current.innerText = initialTextOnEditStart.current;
        }
        setIsEditing(false);
        elementRef.current?.blur();
      } else if (e.key === 'Enter' && !multiline) {
        e.preventDefault();
        e.stopPropagation();
        elementRef.current?.blur();
      }
    },
    [multiline]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Plain text only
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(text));
    }
  }, []);

  // Standard public visitor mode: clean, standard element without any edit wrappers
  if (!isEditMode) {
    return (
      <Component className={className} style={style}>
        {textValue || children}
      </Component>
    );
  }

  // Owner Edit Mode: live editable element
  return (
    <Component
      ref={elementRef as any}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      tabIndex={0}
      title={label ? `Click to edit ${label} (${storageKey})` : `Click to edit text (${storageKey})`}
      data-edit-key={storageKey}
      style={style}
      className={cn(
        className,
        // Dotted outline on hover & focus
        'transition-all duration-150',
        !isEditing && [
          'outline-dashed outline-1 outline-[#015557]/60 hover:outline-2 hover:outline-[#015557]',
          'hover:bg-[#015557]/10 hover:shadow-xs cursor-text rounded-xs',
          'relative',
        ],
        isEditing && [
          'outline-2 outline-solid outline-[#015557] bg-white text-slate-900 shadow-md',
          'cursor-text rounded-xs ring-2 ring-[#015557]/30 px-1',
        ]
      )}
    >
      {textValue}
    </Component>
  );
}

export default EditableText;
