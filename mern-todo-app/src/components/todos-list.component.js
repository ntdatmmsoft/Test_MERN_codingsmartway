import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TodoTableRow from './TodoTableRow';
//create link url for delete

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList = () => {
        return this.state.todos.map(function (currentTodo, i) {
            return <TodoTableRow todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
