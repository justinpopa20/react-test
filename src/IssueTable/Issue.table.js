import React, { Component } from 'react';
import Issue from '../models/Issue';
import './Issue.table.css';

class IssueTable extends Component {
    constructor(props) {
        super(props);
        const issues = props.issues.map(issue => {
            return new Issue(issue);
        });
        this.state = {
            issues: issues || []
        };

        this.deleteIssue = this.deleteIssue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign(this.state, {
            isVisible: nextProps.isVisible,
            issues: nextProps.issues
        }));
    }
    
    deleteIssue(issueId) {
        this.props.onDeleteIssue(issueId);
    }

    renderTableHead() {
        return (
            <tr>
                <th>Issue ID</th>
                <th>Issue Name</th>
                <th>Issue Status</th>
                <th>Actions</th>
            </tr>
        );
    }

    renderTableBody() {
        return this.state.issues.map(issue => {
            return (
                <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.name}</td>
                    <td>{issue.status}</td>
                    <td>
                    <button type="button" className="btn btn-danger" onClick={this.deleteIssue}>Danger</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="table">
                <thead className="thead-light">
                    {this.renderTableHead()}
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
        );
    }
}

export {
    IssueTable
};
