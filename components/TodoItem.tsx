"use client";

type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  user: { name: string };
  createdAt: string;
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const nextStatus: Record<string, string> = {
  PENDING: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "PENDING",
};

export default function TodoItem({
  todo,
  onUpdate,
}: {
  todo: Todo;
  onUpdate: () => void;
}) {
  const handleStatusChange = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus[todo.status] }),
    });
    onUpdate();
  };

  const handleDelete = async () => {
    await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
    onUpdate();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{todo.title}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[todo.status]}`}
          >
            {statusLabels[todo.status]}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[todo.priority]}`}
          >
            {todo.priority}
          </span>
        </div>
        {todo.description && (
          <p className="text-sm text-gray-600 mb-1">{todo.description}</p>
        )}
        <p className="text-xs text-gray-400">
          Assigned to {todo.user.name}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleStatusChange}
          className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          {todo.status === "DONE" ? "Reopen" : "Next"}
        </button>
        <button
          onClick={handleDelete}
          className="text-sm px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
