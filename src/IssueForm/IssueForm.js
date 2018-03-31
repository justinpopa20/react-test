import React, {Component} from 'react';
import Issue from '../models/Issue';

class IssueForm extends Component {
    issueForm = undefined;
    issueName = undefined;
    issueStatus = undefined;

    constructor(props) {
        super(props);

        this.state = {
            isVisible: props.isVisible,
            issue: new Issue({name: 'test'})
        };

        this.createIssue = this
            .createIssue
            .bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.isVisible});
    }

    createIssue() {
        console.log(this.state.issue);
        this.props.onCreateIssue(this.state.issue);
    }

    handleIssueNameChange = (e) => {
        const issue = this.state.issue;
        issue.name = e.target.value;
        this.setState({issue: issue});
    }

    handleIssueStatusChange(newStatus) {
        return e => {
            const issue = this.state.issue;
            issue.status = newStatus;
            this.setState({issue: issue});
        }
    }

    render() {
        const formCls = this.state.isVisible
            ? ''
            : 'd-none';
        console.log('IssueForm::render::', this.state);
        const issue = this.state.issue;

        return (
            <form className={formCls}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Issue name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={issue.name}
                        onChange={this.handleIssueNameChange}
                        placeholder="Enter fucking name"/>
                </div>
                <div className="form-group">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            {issue.status ? issue.status : 'Issue status'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={this.handleIssueStatusChange('New')}>New</a>
                            <a className="dropdown-item" onClick={this.handleIssueStatusChange('Draft')}>Draft</a>
                            <a className="dropdown-item" onClick={this.handleIssueStatusChange('Ready for dev')}>Ready for dev</a>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.createIssue}>Create Issue</button>
            </form>
        );
    }
}

export default IssueForm;