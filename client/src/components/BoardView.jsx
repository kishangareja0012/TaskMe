import React from "react";
import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";

const BoardView = ({ tasks, status }) => {
  // Group tasks by status
  const groupedTasks = {
    todo: tasks.filter((task) => task.stage === "todo"),
    inProgress: tasks.filter((task) => task.stage === "in progress"),
    completed: tasks.filter((task) => task.stage === "completed"),
  };

  // Filter tasks if a specific status is provided
  const filteredTasks = status
    ? tasks.filter((task) => task.stage === status)
    : null;

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {!status && (
          <>
            {/* To Do Column */}
            <div className="flex flex-col gap-4">
              {groupedTasks.todo.map((task, index) => (
                <TaskCard task={task} key={index} />
              ))}
            </div>

            {/* In Progress Column */}
            <div className="flex flex-col gap-4">
              {groupedTasks.inProgress.map((task, index) => (
                <TaskCard task={task} key={index} />
              ))}
            </div>

            {/* Completed Column */}
            <div className="flex flex-col gap-4">
              {groupedTasks.completed.map((task, index) => (
                <TaskCard task={task} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        {status && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* <TaskTitle label={status} className={`bg-${status}-600`} /> */}
            {filteredTasks.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BoardView;
