
import type { Task, TaskPriority, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";

export function TaskList({
  tasks,
  onStatus,
  onPriority,
  onDelete,
}: {
  tasks: Task[];
  onStatus: (id: number, status: TaskStatus) => void;
  onPriority: (id: number, priority: TaskPriority) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatus={onStatus}
          onPriority={onPriority}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
