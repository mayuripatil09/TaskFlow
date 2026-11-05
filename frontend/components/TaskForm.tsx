
"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import type { TaskPriority } from "@/types/task";

export function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (cleanTitle.length === 0) {
      setError("Please enter a valid task title.");
      return;
    }

    setError("");
    setSaving(true);

    api.create(cleanTitle, description, priority)
      .then(() => {
        setTitle("");
        setDescription("");
        setPriority("medium");
        onCreated();
      })
      .catch(() => {
        setError("Unable to create task. Please try again.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Add a task</h2>

      <label htmlFor="title" className="mt-5 block text-sm font-medium">
        Title
      </label>

      <input
        id="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        placeholder="What needs doing?"
        maxLength={255}
        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <label htmlFor="description" className="mt-4 block text-sm font-medium">
        Description (optional)
      </label>

      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2"
      />

      <label htmlFor="priority" className="mt-4 block text-sm font-medium">
        Priority
      </label>

      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={saving}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white disabled:opacity-60"
      >
        {saving ? "Adding..." : "Add task"}
      </button>
    </form>
  );
}
