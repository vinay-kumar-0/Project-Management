// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// export default function ManagerDashboard() {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Define the exact phases from your backend Task model
//   const SDLC_PHASES = ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'];

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await api.get('/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Failed to fetch tasks:', error);
//       // Kick them to login if the token is invalid or expired
//       if (error.response?.status === 401) handleLogout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
//       <div className="mx-auto max-w-full overflow-hidden">
        
//         {/* Header Section */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Project Overview</h1>
//             <p className="mt-2 text-slate-400">Global SDLC Phase Tracker</p>
//           </div>
//           <div className="flex gap-4">
//             <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500">
//               + Create New Task
//             </button>
//             <button 
//               onClick={handleLogout} 
//               className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-slate-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
        
//         {/* Kanban Board Layout */}
//         {loading ? (
//           <div className="flex items-center justify-center p-12">
//             <p className="animate-pulse text-lg text-slate-400">Loading project data...</p>
//           </div>
//         ) : (
//           <div className="flex h-[calc(100vh-200px)] gap-6 overflow-x-auto pb-4">
//             {SDLC_PHASES.map((phase) => (
//               <div key={phase} className="flex min-w-[320px] flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                
//                 {/* Column Header */}
//                 <div className="mb-4 flex items-center justify-between">
//                   <h2 className="font-semibold text-slate-300">{phase}</h2>
//                   <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300">
//                     {tasks.filter(t => t.status === phase).length}
//                   </span>
//                 </div>

//                 {/* Task Cards Container */}
//                 <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
//                   {tasks.filter(t => t.status === phase).map(task => (
//                     <div 
//                       key={task._id} 
//                       className="group cursor-pointer rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/20"
//                     >
//                       <h3 className="text-sm font-medium text-white">{task.title}</h3>
//                       {task.description && (
//                         <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
//                           {task.description}
//                         </p>
//                       )}
//                       <div className="mt-4 flex items-center justify-between">
//                         <span className="rounded bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-300">
//                           {task.assignedTo?.email?.split('@')[0] || 'Unassigned'}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {/* Empty State for Columns */}
//                   {tasks.filter(t => t.status === phase).length === 0 && (
//                     <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-slate-500">
//                       No tasks in this phase
//                     </div>
//                   )}
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// export default function ManagerDashboard() {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
//   const [creating, setCreating] = useState(false);

//   const SDLC_PHASES = ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'];

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Fetch both tasks and employees at the same time
//       const [taskRes, empRes] = await Promise.all([
//         api.get('/tasks'),
//         api.get('/users/employees')
//       ]);
//       setTasks(taskRes.data);
//       setEmployees(empRes.data);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       if (error.response?.status === 401) handleLogout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     setCreating(true);
//     try {
//       await api.post('/tasks', newTask);
//       setIsModalOpen(false); // Close the modal
//       setNewTask({ title: '', description: '', assignedTo: '' }); // Reset form
//       fetchData(); // Refresh the task board
//     } catch (error) {
//       console.error('Error creating task:', error);
//       alert('Failed to create task');
//     } finally {
//       setCreating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
//       <div className="mx-auto max-w-full overflow-hidden">
        
//         {/* Header Section */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Project Overview</h1>
//             <p className="mt-2 text-slate-400">Global SDLC Phase Tracker</p>
//           </div>
//           <div className="flex gap-4">
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
//             >
//               + Create New Task
//             </button>
//             <button 
//               onClick={handleLogout} 
//               className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-slate-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
        
//         {/* Kanban Board Layout */}
//         {loading ? (
//           <div className="flex items-center justify-center p-12">
//             <p className="animate-pulse text-lg text-slate-400">Loading project data...</p>
//           </div>
//         ) : (
//           <div className="flex h-[calc(100vh-200px)] gap-6 overflow-x-auto pb-4">
//             {SDLC_PHASES.map((phase) => (
//               <div key={phase} className="flex min-w-[320px] flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                
//                 {/* Column Header */}
//                 <div className="mb-4 flex items-center justify-between">
//                   <h2 className="font-semibold text-slate-300">{phase}</h2>
//                   <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300">
//                     {tasks.filter(t => t.status === phase).length}
//                   </span>
//                 </div>

//                 {/* Task Cards Container */}
//                 <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
//                   {tasks.filter(t => t.status === phase).map(task => (
//                     <div 
//                       key={task._id} 
//                       className="group cursor-pointer rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/20"
//                     >
//                       <h3 className="text-sm font-medium text-white">{task.title}</h3>
//                       {task.description && (
//                         <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
//                           {task.description}
//                         </p>
//                       )}
//                       <div className="mt-4 flex items-center justify-between">
//                         <span className="rounded bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-300">
//                           {task.assignedTo?.email?.split('@')[0] || 'Unassigned'}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {tasks.filter(t => t.status === phase).length === 0 && (
//                     <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-slate-500">
//                       No tasks in this phase
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Task Creation Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//             <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 shadow-2xl ring-1 ring-slate-700">
//               <h2 className="mb-4 text-xl font-bold text-white">Create New Task</h2>
//               <form onSubmit={handleCreateTask} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300">Task Title</label>
//                   <input
//                     type="text"
//                     required
//                     value={newTask.title}
//                     onChange={(e) => setNewTask({...newTask, title: e.target.value})}
//                     className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     placeholder="e.g., Build Database Schema"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300">Description</label>
//                   <textarea
//                     rows="3"
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({...newTask, description: e.target.value})}
//                     className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     placeholder="Provide details..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300">Assign To</label>
//                   <select
//                     required
//                     value={newTask.assignedTo}
//                     onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
//                     className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   >
//                     <option value="" disabled>Select an employee</option>
//                     {employees.map(emp => (
//                       <option key={emp._id} value={emp._id}>{emp.email}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={creating}
//                     className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
//                   >
//                     {creating ? 'Creating...' : 'Create Task'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
















import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
  const [creating, setCreating] = useState(false);

  const SDLC_PHASES = ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [taskRes, empRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/users/employees')
      ]);
      setTasks(taskRes.data);
      setEmployees(empRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      if (error.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post('/tasks', newTask);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', assignedTo: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  // --- DRAG AND DROP LOGIC ---

  // 1. When the user grabs a card, save that card's ID to the browser's drag memory
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  // 2. Allow columns to be "drop zones" by preventing the default browser behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 3. When the card is dropped, read the ID, update the UI instantly, and tell the database
  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');

    // Optimistic UI update: Move it on screen instantly before the database responds
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Tell the backend to update the database
    try {
      await api.put(`/tasks/${taskId}/status`, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
      fetchData(); // If it fails, refresh the board to fix the UI
      alert('Failed to move task. Are you authorized?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <div className="mx-auto max-w-full overflow-hidden">
        
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Project Overview</h1>
            <p className="mt-2 text-slate-400">Global SDLC Phase Tracker</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
            >
              + Create New Task
            </button>
            <button 
              onClick={handleLogout} 
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Kanban Board Layout */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <p className="animate-pulse text-lg text-slate-400">Loading project data...</p>
          </div>
        ) : (
          <div className="flex h-[calc(100vh-200px)] gap-6 overflow-x-auto pb-4">
            {SDLC_PHASES.map((phase) => (
              <div 
                key={phase} 
                onDragOver={handleDragOver}     // Make column a drop zone
                onDrop={(e) => handleDrop(e, phase)} // Handle the drop event
                className="flex min-w-[320px] flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800/70"
              >
                
                {/* Column Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-300">{phase}</h2>
                  <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                    {tasks.filter(t => t.status === phase).length}
                  </span>
                </div>

                {/* Task Cards Container */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                  {tasks.filter(t => t.status === phase).map(task => (
                    <div 
                      key={task._id} 
                      draggable                       // Make the card draggable
                      onDragStart={(e) => handleDragStart(e, task._id)} // Store ID when grabbed
                      className="group cursor-grab active:cursor-grabbing rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/20"
                    >
                      <h3 className="text-sm font-medium text-white">{task.title}</h3>
                      {task.description && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                          {task.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="rounded bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-300">
                          {task.assignedTo?.email?.split('@')[0] || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.filter(t => t.status === phase).length === 0 && (
                    <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-slate-500">
                      Drag tasks here
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Task Creation Modal (Unchanged) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 shadow-2xl ring-1 ring-slate-700">
              <h2 className="mb-4 text-xl font-bold text-white">Create New Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Build Database Schema"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Description</label>
                  <textarea
                    rows="3"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Provide details..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Assign To</label>
                  <select
                    required
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select an employee</option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.email}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}