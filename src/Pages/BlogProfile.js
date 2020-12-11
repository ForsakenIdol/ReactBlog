import { Component } from 'react';

export default class BlogProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleStatus();
    }

    render() {
        return (
            <div className="blog-profile">
                <p>Hello World!</p>
            </div>
        );
    }

}