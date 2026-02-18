"use client";

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
};

export default function TodoForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !userId) return;

    setIsSubmitting(true);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority, userId }),
    });
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setIsSubmitting(false);
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">New Task</h2>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </select>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}
