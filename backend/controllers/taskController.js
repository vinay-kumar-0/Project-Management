import Task from '../models/Task.js';

// @desc    Get tasks (Managers see all, Employees see their assigned tasks)
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    let tasks;
    
    // If the user is a manager, fetch every task in the database
    if (req.user.role === 'manager') {
      tasks = await Task.find().populate('assignedTo', 'email role');
    } 
    // If the user is an employee, ONLY fetch tasks assigned to their MongoDB ID
    else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'email role');
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
};

// @desc    Create a new task (Manager Only)
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  if (!title || !assignedTo) {
    return res.status(400).json({ message: 'Title and Assignee are required.' });
  }

  try {
    const task = new Task({
      title,
      description,
      status: 'Backlog', // All new tasks start in the Backlog
      assignedTo,
      createdBy: req.user._id,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task.' });
  }
};

// @desc    Update task status (e.g., dragging a card from To-Do to In Progress)
// @route   PUT /api/tasks/:id/status
export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const validStatuses = ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status update.' });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Security Check: If employee, ensure they are only updating their OWN assigned task
    if (req.user.role === 'employee' && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task.' });
    }

    task.status = status;
    const updatedTask = await task.save();
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task.' });
  }
};