// export default function EmployeeDashboard() {
//   const user = JSON.stringify(localStorage.getItem('user'));
  
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
//         <p className="mt-2 text-gray-600">Welcome to your focused workspace. Only your assigned tasks appear here.</p>
        
//         {/* We will build the Kanban board here later */}
//         <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//           <p className="text-gray-500">Your task board will go here...</p>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios'; // Import our new custom Axios

// export default function EmployeeDashboard() {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch tasks as soon as the dashboard loads
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get('/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Failed to fetch tasks:', error);
//         // If the backend says "401 Unauthorized" (e.g., token expired), log them out
//         if (error.response?.status === 401) {
//           handleLogout();
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
//             <p className="mt-2 text-gray-600">Welcome to your focused workspace.</p>
//           </div>
//           <button 
//             onClick={handleLogout}
//             className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
//           >
//             Logout
//           </button>
//         </div>
        
//         {/* Basic Task List Viewer */}
//         <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Assigned to Me</h2>
          
//           {loading ? (
//             <p className="text-gray-500">Loading your tasks...</p>
//           ) : tasks.length === 0 ? (
//             <p className="text-gray-500">You have no tasks assigned right now.</p>
//           ) : (
//             <ul className="space-y-3">
//               {tasks.map((task) => (
//                 <li key={task._id} className="flex justify-between rounded-lg border p-4 shadow-sm">
//                   <div>
//                     <p className="font-bold">{task.title}</p>
//                     <p className="text-sm text-gray-500">{task.description}</p>
//                   </div>
//                   <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 h-fit">
//                     {task.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import { CheckCircle2, CircleDashed, ArrowRightCircle, Code2, Bug } from 'lucide-react';

// export default function EmployeeDashboard() {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   // The function to update task status
//   const handleStatusChange = async (taskId, newStatus) => {
//     // Optimistic UI update for instant feedback
//     setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    
//     try {
//       await api.put(`/tasks/${taskId}/status`, { status: newStatus });
//     } catch (error) {
//       console.error('Failed to update status:', error);
//       alert('Failed to update task. Please try again.');
//       fetchTasks(); // Revert UI on failure
//     }
//   };

//   // Helper function to pick an icon based on status
//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'Done': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
//       case 'In Progress': return <ArrowRightCircle className="h-5 w-5 text-blue-500" />;
//       case 'Code Review': return <Code2 className="h-5 w-5 text-purple-500" />;
//       case 'Testing': return <Bug className="h-5 w-5 text-amber-500" />;
//       default: return <CircleDashed className="h-5 w-5 text-gray-400" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-4xl">
        
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">My Workspace</h1>
//             <p className="mt-1 text-sm text-gray-500">Manage your assigned SDLC tasks</p>
//           </div>
//           <button 
//             onClick={handleLogout}
//             className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
//           >
//             Logout
//           </button>
//         </div>
        
//         {/* Task List */}
//         <div className="space-y-4">
//           {loading ? (
//             <div className="text-center p-12 text-gray-500 animate-pulse">Loading your tasks...</div>
//           ) : tasks.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
//               You're all caught up! No tasks assigned right now.
//             </div>
//           ) : (
//             tasks.map((task) => (
//               <div 
//                 key={task._id} 
//                 className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="mt-1">
//                     {getStatusIcon(task.status)}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
//                     {task.description && (
//                       <p className="mt-1 text-sm text-gray-600">{task.description}</p>
//                     )}
//                     <div className="mt-3 flex items-center gap-2">
//                       <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
//                         {new Date(task.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status Dropdown */}
//                 <div className="flex shrink-0 items-center sm:ml-4">
//                   <label className="mr-3 text-sm font-medium text-gray-500">Status:</label>
//                   <select
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                     className="cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   >
//                     {SDLC_PHASES.map(phase => (
//                       <option key={phase} value={phase}>{phase}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }














import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CheckCircle2, CircleDashed, ArrowRightCircle, Code2, Bug } from 'lucide-react';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const SDLC_PHASES = ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
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

  const handleStatusChange = async (taskId, newStatus) => {
    setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      await api.put(`/tasks/${taskId}/status`, { status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update task. Please try again.');
      fetchTasks();
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Done': return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'In Progress': return <ArrowRightCircle className="h-5 w-5 text-blue-400" />;
      case 'Code Review': return <Code2 className="h-5 w-5 text-purple-400" />;
      case 'Testing': return <Bug className="h-5 w-5 text-amber-400" />;
      default: return <CircleDashed className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-white">My Workspace</h1>
            <p className="mt-1 text-sm text-slate-400">Manage your assigned SDLC tasks</p>
          </div>
          <button 
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
        
        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <div className="animate-pulse p-12 text-center text-slate-400">Loading your tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 p-12 text-center text-slate-400">
              You're all caught up! No tasks assigned right now.
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task._id} 
                className="group flex flex-col gap-4 rounded-2xl border border-slate-600 bg-slate-800 p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/20 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(task.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{task.title}</h3>
                    {task.description && (
                      <p className="mt-1 text-sm text-slate-400">{task.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex shrink-0 items-center sm:ml-4">
                  <label className="mr-3 text-sm font-medium text-slate-400">Status:</label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="cursor-pointer rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {SDLC_PHASES.map(phase => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}