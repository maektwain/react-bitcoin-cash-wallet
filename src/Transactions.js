import React,{Component} from 'react';

class Transactions extends Component {
    render() {
        return (
            <table className="bordered centered">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Outgoing</td>
                        <td>anotheraddress</td>
                        <td>0.00355</td>
                    </tr>

                    <tr>
                        <td>Incoming</td>
                        <td>sumaddress</td>
                        <td>0.00355</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default Transactions;