
"use client";

import type { Task, TaskPriority, TaskStatus } from "@/types/task";

const labels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Completed",
};

const colors: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
};

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-sky-100 text-sky-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-rose-100 text-rose-800",
};

export function TaskCard({
  task,
  onStatus,
  onPriority,
  onDelete,
}: {
  task: Task;
  onStatus: (id: number, status: TaskStatus) => void;
  onPriority: (id: number, priority: TaskPriority) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-slate-500">{task.description}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${colors[task.status]}`}>
            {labels[task.status]}
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <label className="text-sm text-slate-500">
          Status
          <select
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(e) => onStatus(task.id, e.target.value as TaskStatus)}
            className="ml-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </label>

        <label className="text-sm text-slate-500">
          Priority
          <select
            aria-label={`Priority for ${task.title}`}
            value={task.priority}
            onChange={(e) => onPriority(task.id, e.target.value as TaskPriority)}
            className="ml-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm font-medium text-rose-600 hover:text-rose-800"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
