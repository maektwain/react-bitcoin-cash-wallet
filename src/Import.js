import React,{Component} from 'react';

class Import extends Component {
    
    constructor(props) {
        super(props);
        this.commit = this.commit.bind(this);
    }

    commit(e) {
        this.props.importWif(e.target.value);
    }

    render() {
        return (
            <div className="col s6 offset-s3">
                <h4 className="center-align">Paste your WIF here</h4>
                <input onChange={this.commit}/>
            </div>
        );
    }
}
export default Import;