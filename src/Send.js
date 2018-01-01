import React,{Component} from 'react';

class Send extends Component {

    constructor(props) {
      super(props);
      this.send = this.send.bind(this);

    }

    send = () => {
      this.props.sendBch();
    }
    render() {
        return (
            <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
          <label>Recipient Address</label>
        </div>

        <div className="input-field col s3 offset-s3">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
          <label>Amount</label>
        </div>
        <div className="input-field col s3">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
          <label>Transaction Fee (default is optimal)</label>
        </div>
        <div className="col s3 offset-s5">
            <a className="btn" onClick={this.send}>SEND</a>
        </div>
      </div>
    </form>
  </div>
        );
    }
}
export default Send;