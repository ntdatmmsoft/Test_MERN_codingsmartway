import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
//create link url for delete



const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
        {/* <td>
            <Button onClick={this.delRecord}>Delete</Button>
        </td> */}
    </tr>
)

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
        this.delRecord = this.delRecord.bind(this);
    }

    delRecord = () => {
        // axios.path('http://localhost:4000/todos/delete' + this.props.obj._id)
        //     .then((res) => {
        //         console.log('Successfully deleted!')
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        console.log('Delete function');
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
        this.state.todos.map(function (currentTodo, i) {
            const {
                _id,
                todo_description,
                todo_responsible,
                todo_priority,
                todo_completed
            } = currentTodo;
            return <Todo todo={currentTodo} key={i} />;
            //return
            //(
            // <tr key={i}>
            //     <td>{todo_description}</td>
            //     <td>{todo_responsible}</td>
            //     <td>{todo_priority}</td>
            //     <td>{todo_completed}</td>
            //     <td>
            //         <Link to={"/edit/" + _id}>Edit</Link>
            //     </td>
            //     <td>
            //         <button size="sm" variant="danger" onClick={this.delRecord}>Delete</button>
            //     </td>
            // </tr>
            //)
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
                            <th>
                                Delete
                            </th>
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
