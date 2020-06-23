import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class TodoTableRow extends Component {

    constructor(props) {
        super(props);
        this.delRecord = this.delRecord.bind(this);
    }

    delRecord() {
        axios.delete('http://localhost:4000/todos/delete/' + this.props.todo._id)
            .then((res) => {
                console.log('Successfully deleted!');
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
                <td>
                    <Link class="edit-link" to={"/edit/" + this.props.todo._id}>
                        Edit
                    </Link>
                </td>
                <td>
                    <Button onClick={this.delRecord} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}
