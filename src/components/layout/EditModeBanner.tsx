import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEditMode } from '@/context/EditModeContext';
import FloatingEditToolbar from '../editable/FloatingEditToolbar';

/**
 * Owner-only Live Site Editor Controller.
 * Never rendered or loaded for public visitors.
 */
export default function EditModeBanner() {
  const location = useLocation();
  const { isOwner, isEditMode, setEditMode } = useEditMode();

  useEffect(() => {
    if (isOwner && !isEditMode) {
      const params = new URLSearchParams(location.search);
      if (params.get('edit') === 'true') {
        setEditMode(true);
      }
    }
  }, [location.search, isOwner, isEditMode, setEditMode]);

  return <FloatingEditToolbar />;
}

