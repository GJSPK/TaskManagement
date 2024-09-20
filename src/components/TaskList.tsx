// src/components/TaskList.tsx

import React from 'react';
import { Task } from '../models/Task';
import TaskItem from './TaskItem';
import { Category } from '../models/Category';

interface TaskListProps {
  tasks: Task[];
  editTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  categories: Category[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  editTask,
  deleteTask,
  categories,
}) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            categories={categories}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
