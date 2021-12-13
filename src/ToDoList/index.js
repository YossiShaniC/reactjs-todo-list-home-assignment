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
      this.setState({ toDoList: data, showWaiter: false });
    });
  }

  handleSpecialClick = (id, index) => {
    const stateCopy = JSON.parse(JSON.stringify(this.state));
    //immutable array copy
    const newArr = Array.from(this.state.toDoList);
    //splice = delete the element
    newArr.splice(index, 1);
    this.setState({
      toDoList: newArr
    });
    api.deleteTodo({ todoId: id }).catch(() => {
      //revert state
      this.setState({ ...stateCopy });
    });
  }


  handleRegularClick = (id, index, completed) => {
    //create state copy in order to restore it afterwards if needed
    const stateCopy = JSON.parse(JSON.stringify(this.state));

    const updateParams = { todoId: id, update: { completed: !completed } };
    //get relevant element from array
    const currElement = this.state.toDoList[index];
    //create the updated element
    const updatedObj = Object.assign({}, currElement, { completed: !completed });
    //copy the array in order to do the splice, immutable array copy
    const newArr = Array.from(this.state.toDoList);
    //splice = replace the ekement with the updated one
    newArr.splice(index, 1, updatedObj);

    this.setState({
      toDoList: newArr
    });

    api.updateTodo(updateParams).catch(() => {
      //if failed, go back to previous situation
      this.setState({ ...stateCopy });
    });
  }

  toDoItemClicked = (e, id, index, completed) => {
    //if ctrl + click on windows or commade + click on mac
    if (e.ctrlKey || e.metaKey) {
      //delete
      this.handleSpecialClick(id, index);
    } else {
      //toggle
      this.handleRegularClick(id, index, completed);
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
