import React from "react";
import classes from "./ToDoItem.module.css";

const ToDoItem = (props) => {
  return (
    <div
      className={classes.toDoItem}
      style={{
        color: props.val.completed ? "gray" : "white",
        textDecoration: props.completed ? "line-through" : "none"
      }}
      onClick={(e) =>
        props.toDoItemClicked(e, props.val.id, props.index, props.val.completed)
      }
      key={props.index}
    >
      {props.val.title}
    </div>
  );
};

export default ToDoItem;
