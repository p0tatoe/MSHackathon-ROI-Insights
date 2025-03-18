import React, { useState } from 'react';
import styles from '../planning.module.css';

const Planning = () => {
  // Initial board data
  const [columns, setColumns] = useState({
    todo: { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2', 'task-3'] },
    inProgress: { id: 'inProgress', title: 'In Progress', taskIds: ['task-4', 'task-5'] },
    review: { id: 'review', title: 'Review', taskIds: ['task-6'] },
    done: { id: 'done', title: 'Done', taskIds: ['task-7'] },
  });

  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', content: 'Create project plan' },
    'task-2': { id: 'task-2', content: 'Design wireframes' },
    'task-3': { id: 'task-3', content: 'Research API integration' },
    'task-4': { id: 'task-4', content: 'Implement authentication' },
    'task-5': { id: 'task-5', content: 'Create database schema' },
    'task-6': { id: 'task-6', content: 'Review code' },
    'task-7': { id: 'task-7', content: 'Setup testing framework' },
  });

  const [draggedItem, setDraggedItem] = useState(null);

  // Handle starting a drag operation
  const handleDragStart = (taskId) => setDraggedItem(taskId);

  // Handle dropping a task in a column
  const handleDrop = (columnId) => {
    if (!draggedItem) return;

    const sourceColumn = Object.values(columns).find(column => column.taskIds.includes(draggedItem));
    if (!sourceColumn || sourceColumn.id === columnId) return setDraggedItem(null);

    const newColumns = { ...columns };
    newColumns[sourceColumn.id] = { ...sourceColumn, taskIds: sourceColumn.taskIds.filter(id => id !== draggedItem) };
    newColumns[columnId] = { ...newColumns[columnId], taskIds: [...newColumns[columnId].taskIds, draggedItem] };

    setColumns(newColumns);
    setDraggedItem(null);
  };

  return (
    <div className={styles.boardContainer}>
      <h1 className={styles.boardTitle}>Kanban Board</h1>
      
      <div className={styles.columnContainer}>
        {Object.values(columns).map(column => (
          <div 
            key={column.id}
            className={styles.column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <div className={styles.columnHeader}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
            </div>

            <div className={styles.taskContainer}>
              {column.taskIds.map(taskId => {
                const task = tasks[taskId];
                return (
                  <div 
                    key={task.id}
                    className={`${styles.task} ${draggedItem === task.id ? styles.dragging : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <div className="text-sm mb-1">{task.content}</div>
                    <div className={styles.taskActions}>
                      <button className={`${styles.button} ${styles.editButton}`}>Edit</button>
                      <button className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;