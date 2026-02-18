"use client";

import { useState, useEffect, useCallback } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  user: { name: string };
  createdAt: string;
};

export default function TodoList({ refreshKey }: { refreshKey: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchTodos = useCallback(async () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (priorityFilter) params.set("priority", priorityFilter);

    const res = await fetch(`/api/todos?${params}`);
    const data = await res.json();
    setTodos(data);
  }, [statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, refreshKey]);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <div className="grid gap-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks found</p>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
          ))
        )}
      </div>
    </div>
  );
}
