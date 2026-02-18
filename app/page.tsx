"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <TodoForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <TodoList refreshKey={refreshKey} />
    </div>
  );
}
