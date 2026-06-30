import { useState } from "react";
import { IoIosSave } from "react-icons/io";
import { MdTask, MdCheckCircle, MdDelete } from "react-icons/md";


function Dashboard() {
  const [active, setActive] = useState("My Tasks");
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "My Tasks",
  });
  const navItems = [
    { label: "My Tasks", icon: <MdTask /> },
    { label: "Saved", icon: <IoIosSave /> },
    { label: "Finished", icon: <MdCheckCircle /> },
    { label: "Bin", icon: <MdDelete /> },
  ];


  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    setTasks([...tasks, { ...newTask, id: Date.now() }]);

    setNewTask({
      title: "",
      description: "",
      status: active,
    });

    setModalOpen(false);
  };

  const handleDelete = (taskId) => {
    if (active === "Bin") {
      // permanently remove
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } else {
      // move to bin
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: "Bin" } : t
        )
      );
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.status === active
  );

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-5 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">Task Manager</h2>

        <nav className="space-y-3">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2 ${active === label ? "bg-gray-800" : ""
                }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center flex-shrink-0">
          <h1 className="text-2xl font-bold">{active}</h1>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => {
              setNewTask({
                title: "",
                description: "",
                status: active,
              });
              setModalOpen(true);
            }}
          >
            Add Task
          </button>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500">
                No tasks found in "{active}".
              </p>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">
                        {task.title}
                      </h3>
                      <button className="inline-block text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-red-300 transition hover:cursor-pointer"
                        onClick={() => handleDelete(task.id)}>
                        delete
                      </button>
                    </div>

                    <p className="text-gray-600 mt-1">
                      {task.description}
                    </p>

                    <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {task.status}
                    </span>

                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Add New Task
            </h3>

            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Title
                </label>

                <input
                  autoFocus
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Status
                </label>

                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option>My Tasks</option>
                  <option>Saved</option>
                  <option>Finished</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;