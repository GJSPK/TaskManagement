// src/components/SubtaskItem.tsx

import React from 'react';
import { Subtask } from '../models/Task';
import { ListItem, Checkbox, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface SubtaskItemProps {
  subtask: Subtask;
  editSubtask: (subtask: Subtask) => void;
  deleteSubtask: (subtaskId: number) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subtask,
  editSubtask,
  deleteSubtask,
}) => {
  const handleCompleteChange = () => {
    editSubtask({ ...subtask, isComplete: !subtask.isComplete });
  };

  return (
    <ListItem>
      <Checkbox
        checked={subtask.isComplete}
        onChange={handleCompleteChange}
        color="primary"
      />
      <ListItemText primary={subtask.description} />
      <IconButton edge="end" onClick={() => deleteSubtask(subtask.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default SubtaskItem;
