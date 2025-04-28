import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // New state for confirmation modal
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); // State to store task to be deleted

  useEffect(() => {
    if (userId) {
      taskService.getTasks(userId).then(setTasks);
    }
  }, [userId]);

  const handleCreateTask = () => {
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setShowModal(true);
  };
  
  const handleSaveTask = async () => {
    if (!taskTitle || !taskDescription) {
      alert('Please enter both title and description');
      return;
    }

    try {
      if (editTaskId) {
        // Update existing task
        await taskService.updateTask(editTaskId, { title: taskTitle, description: taskDescription });
        taskService.getTasks(userId).then(setTasks);
        setShowModal(false);
        setTaskTitle('');
        setTaskDescription('');
        setEditTaskId(null);
      } else {
        // Create new task
        await taskService.createTask({ title: taskTitle, description: taskDescription, userId });
        taskService.getTasks(userId).then(setTasks);
        setShowModal(false);
        setTaskTitle('');
        setTaskDescription('');
      }
    } catch (error) {
      alert('Error saving task');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleDelete = async (taskId) => {
    setTaskToDelete(taskId); // Set task to be deleted
    setShowDeleteConfirm(true); // Show confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await taskService.deleteTask(taskToDelete);
      setTasks(tasks.filter(task => task._id !== taskToDelete));
      setShowDeleteConfirm(false); // Hide confirmation modal
      setTaskToDelete(null); // Reset task to be deleted
    } catch (error) {
      alert('Error deleting task');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false); // Hide confirmation modal
    setTaskToDelete(null); // Reset task to be deleted
  };

  return (
    <div style={styles.taskContainer}>
      {tasks.length === 0 ? (
        <div style={styles.noTasksContainer}>
          <h2>No tasks yet</h2>
          <button onClick={handleCreateTask} style={styles.createTaskButton}>Create Task</button>
        </div>
      ) : (
        <>
          <div style={styles.addButtonContainer}>
            <button onClick={handleCreateTask} style={styles.addTaskButton}>Add Task</button>
          </div>
          <ul style={styles.taskList}>
            {tasks.map((task) => (
              <li key={task._id} style={styles.taskCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{task.title}</h3>
                  <div style={styles.cardActions}>
                    <button onClick={() => handleDelete(task._id)} style={styles.deleteButton}>Delete</button>
                    <button onClick={() => handleEdit(task)} style={styles.editButton}>Edit</button> {/* Edit Button */}
                  </div>
                </div>
                <p style={styles.cardDescription}>{task.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>{editTaskId ? 'Edit Task' : 'Create Task'}</h3>
            <div style={styles.modalInputContainer}>
              <label style={styles.modalLabel}>Title: </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                style={styles.modalInput}
                placeholder="Enter task title"
              />
            </div>
            <div style={styles.modalInputContainer}>
              <label style={styles.modalLabel}>Description: </label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                style={styles.modalInput}
                placeholder="Enter task description"
              />
            </div>
            <div style={styles.modalButtons}>
              <button onClick={handleCancel} style={styles.modalButtonCancel}>Cancel</button>
              <button onClick={handleSaveTask} style={styles.modalButtonSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Are you sure you want to delete this task?</h3>
            <div style={styles.modalButtons}>
              <button onClick={cancelDelete} style={styles.modalButtonCancel}>Cancel</button>
              <button onClick={confirmDelete} style={styles.modalButtonSave}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  taskContainer: {
    // position: 'absolute',
    // top: '30%',
    // width: '80%',
    marginTop: '0px',
    alignItems:'center',
    padding: '10px',
    borderRadius: '8px',
  },
  noTasksContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTaskButton: {
    padding: '10px 20px',
    backgroundColor: '#9b8bb7',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  addButtonContainer: {
    textAlign: 'right',
    marginBottom: '10px',
  },
  addTaskButton: {
    padding: '10px 20px',
    backgroundColor: '#9b8bb7',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  taskList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '0',
    margin: '0',
  },
  taskCard: {
    width: 'calc(30.33% - 20px)',  
    marginBottom: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',  
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  
  
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid red',

  },
  cardTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin:0,
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#9b8bb7',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#e0e0e0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cardDescription: {
    fontSize: '1em',
    color: '#555',
    padding:0,
    margin:0
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: 'linear-gradient(135deg,rgb(223, 196, 255),rgb(227, 213, 246))', 
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    color: '#333', 
  },
  
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },  modalInputContainer: {
    marginBottom: '15px',
    width: '95%',  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',  
  },
  modalLabel: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  modalInput: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',  
    marginBottom: '10px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#e0e0e0',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  modalButtonSave: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#9b8bb7', 
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default TaskList;
