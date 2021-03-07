import React from 'react';
import _ from 'lodash';
import TodoCreate from './todo-create';
import TodoList from './todo-list';
// import './style.css';
import './main';

const todos = [
    {
        task: 'Buy Oranges(Click task to mark as done)',
        isCompleted: false
    },
    {
        task: 'Buy Apples of 1/2 KG(Click task to mark as undone)',
        isCompleted: true
    }
];

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: todos
        }
    }

    render() {
        return (
            <div id="main-div">
                <h1>Noter App</h1>
                <div className="td-list-con">

                    <TodoCreate
                        todos={ this.state.todos }
                        createTask={ this.createTask.bind(this) }
                        />

                    <TodoList
                        todos={ this.state.todos }
                        saveTask={ this.saveTask.bind(this) }
                        deleteTask={ this.deleteTask.bind(this) }
                        toggleTask={ this.toggleTask.bind(this) }
                        />
                </div>
            </div>
        )
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }
}