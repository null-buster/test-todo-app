import React from 'react';
import _ from 'lodash';

export default class TodoCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }
        return <p style={{ padding: '5px 10px', background: '#d9534f', color: '#fff' }}>{ this.state.error }</p>;
    }

    render() {
        return (
            <div>
                <form className="create form-horizontal" onSubmit={this.handleCreate.bind(this) }>
                    <div className="form-group">
                        <div className="col-md-10">
                            <input className="form-control" type="text" ref="createInput" placeholder="Write a task" />
                        </div>
                        <div className="col-md-2 text-right">
                            <button type="submit" className="btn btn-default" style={{ background: '#d9edf7'}}>+</button>
                        </div>
                    </div>
                    { this.renderError() }
                </form>
                <form className="create form-horizontal" onSubmit={this.handleBulk.bind(this) }>
                    <div className="form-group">
                        <div className="col-md-10">
                            <textarea className="form-control" type="text" ref="createBulk" placeholder="Write a task" />
                        </div>
                        <div className="col-md-2 text-right">
                            <button type="submit" className="btn btn-default" style={{ background: '#d9edf7'}}>Bulk Add</button>
                        </div>
                    </div>
                    {/* { this.renderError() } */}
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.refs.createInput.focus();
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return false;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }
    handleBulk(event) {
        event.preventDefault();

        const createInput = this.refs.createBulk;
        const task = createInput.value.split(",");
        for(var index=0; index < task.length; index++){
                const validateInput = task[index];

                // if (validateInput) {
                //     this.setState({ error: validateInput });
                //     return false;
                // }

                // this.setState({ error: null });
                this.props.createTask(task[index]);
        }
        this.refs.createBulk.value = '';
    }
    validateInput(task) {
        if (!task) {
            return 'Please enter a task!';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exist!';
        } else {
            return null;
        }
    }
}