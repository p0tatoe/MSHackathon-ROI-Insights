import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from '../planning.module.css';

// Task card component
const Task = ({ id, text, status, moveTask, index, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id, status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSave = () => {
    if (editedText.trim()) {
      editTask(id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={styles.task}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {isEditing ? (
        <div className={styles.editTaskForm}>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
          <div className={styles.editTaskButtons}>
            <button className={`${styles.cancelButton}`} onClick={handleCancel}>
              Cancel
            </button>
            <button className={`${styles.saveButton}`} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.taskContent}>
            <p>{text}</p>
          </div>
          <div className={styles.taskActions}>
            <button
              className={`${styles.actionButton} ${styles.editButton}`}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => deleteTask(id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Column component
const Column = ({ status, tasks, moveTask, editTask, deleteTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Format the column title
  const formatTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };

  return (
    <div
      ref={drop}
      className={`${styles.column} ${isOver ? styles.columnOver : ''}`}
    >
      <h2>{formatTitle(status)}</h2>
      <div className={styles.taskList}>
        {tasks
          .filter((task) => task.status === status)
          .map((task, index) => (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              status={task.status}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              index={index}
            />
          ))}
      </div>
    </div>
  );
};

// Form to add new tasks
const AddTaskForm = ({ addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form className={styles.addTaskForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Main Planning component (Kanban board)
const Planning = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Create design mockups', status: 'todo' },
    { id: 2, text: 'Implement authentication', status: 'inProgress' },
    { id: 3, text: 'Write documentation', status: 'todo' },
    { id: 4, text: 'Test responsive layout', status: 'inProgress' },
    { id: 5, text: 'Code review pull request', status: 'review' },
    { id: 6, text: 'Fix navigation bug', status: 'done' },
  ]);

  // Function to move a task from one column to another
  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  // Function to add a new task
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
  };

  // Function to edit a task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: newText };
        }
        return task;
      })
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const columns = ['todo', 'inProgress', 'review', 'done'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.planningContainer}>
        <h1 className={styles.planningTitle}>Project Planning Board</h1>
        <AddTaskForm addTask={addTask} />
        <div className={styles.board}>
          {columns.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Planning;