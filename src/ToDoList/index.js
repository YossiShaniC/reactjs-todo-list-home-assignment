import * as React from "react";
import * as api from "../api";
import classes from "./ToDoList.module.css";
import ReactLoading from "react-loading";
import ToDoItem from "./ToDoItem";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showWaiter: true,
      toDoList: []
    };
  }

  componentDidMount() {
    api.getTodos().then((data) => {
      console.log(data);
      this.setState({ toDoList: data, showWaiter: false });
    });
  }

  toDoItemClicked = (e, id, index, completed) => {
    console.log(e, id);
    if (e.ctrlKey) {
      //delete
      //save element before delete in order to restore it if required
      const currElement = this.state.toDoList[index];

      const newArr = this.state.toDoList;
      //splice = delete the element
      newArr.splice(index, 1);

      this.setState({
        toDoList: newArr
      });

      api.deleteTodo({ todoId: id }).then((data) => {
        if (data.statusText !== "OK") {
          //not doing push cause I want to restore it to the same position in array
          newArr.splice(index, 0, currElement);
          this.setState({
            toDoList: newArr
          });
        }
      });
    } else {
      //toggle
      const updateParams = { todoId: id, update: { completed: !completed } };
      //get relevant element from array
      const currElement = this.state.toDoList[index];
      //create the updated element
      const updatedObj = Object.assign(currElement, { completed: !completed });
      //copy the array in order to do the splice
      const newArr = this.state.toDoList;
      //splice = replace the ekement with the updated one
      newArr.splice(index, 1, updatedObj);

      this.setState({
        toDoList: newArr
      });

      api.updateTodo(updateParams).then((data) => {
        //if failed, go back to previous situation
        if (data.id !== id) {
          //create the updated element - put the previous situation back
          const updatedObj = Object.assign(currElement, {
            completed: completed
          });
          //copy the array in order to do the splice
          const newArr = this.state.toDoList;
          //splice = replace the ekement with the updated one
          newArr.splice(index, 1, updatedObj);

          this.setState({
            toDoList: newArr
          });
        }
      });
    }
  };

  render() {
    return this.state.showWaiter ? (
      <ReactLoading
        aria-label="Loading"
        type="bubbles"
        color="#3497FD"
        className={classes.waiter}
      />
    ) : (
      <div className={classes.toDoWrapperDiv}>
        {this.state.toDoList.map((val, index) => (
          <ToDoItem
            val={val}
            index={index}
            key={index}
            toDoItemClicked={this.toDoItemClicked}
          />
        ))}
      </div>
    );
  }
}

export default ToDoList;
