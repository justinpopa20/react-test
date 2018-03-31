class Issue {
    id= 0;
    name= 'Issue';
    status= 'Default';

    constructor(issueDTO) {
        this.id = issueDTO.id || new Date().getTime();
        this.name = issueDTO.name;
        this.status = issueDTO.status;
    }
}

export default Issue;