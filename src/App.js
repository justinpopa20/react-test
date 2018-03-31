import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { IssueTable } from './IssueTable/Issue.table';
import IssueForm from './IssueForm/IssueForm';
import Issue from './models/Issue';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
            issues: [
                {
                    id: 0,
                    name: 'Issue 1',
                    status: 'Ready'
                },
                {
                    id: 1,
                    name: 'Issue 2',
                    status: 'Complete'
                },
                {
                    id: 2,
                    name: 'Issue 3',
                    status: 'Delayed'
                }
            ].map(issue => new Issue(issue))
        }
        this.toggleIssueForm = this.toggleIssueForm.bind(this);
        this.onCreateIssue = this.onCreateIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }

    onCreateIssue(newIssue) {
        console.log('onCreateIssue::', newIssue);
        const issues = this.state.issues;
        newIssue.id = new Date().getTime();
        issues.push(Object.assign({}, newIssue));
        const newState = Object.assign(this.state, {issues: issues});
        this.setState(newState);
        console.log('onCreateIssue::', this.state.issues);
    }

    deleteIssue(issueId) {
        const issues = this.state.issues;
        const deleteIndex = issues.findIndex(issue => issue.id=issueId);
        issues.splice(deleteIndex, 1);

        const newState = Object.assign(this.state, {issues: issues});
        this.setState(newState);
    }

    toggleIssueForm() {
        console.log('App::toggleIssueForm');
        this.setState({ isFormVisible: !this.state.isFormVisible });
    }
    
    render() {
        const issueFormVisible = this.state.isFormVisible;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary" onClick={this.toggleIssueForm}>Add new issue</button>
                </div>
                <IssueForm isVisible={issueFormVisible} onCreateIssue={this.onCreateIssue}/>
                <IssueTable issues={this.state.issues} onDeleteIssue={this.deleteIssue}/>
            </div>
        );
    }
}

export default App;
