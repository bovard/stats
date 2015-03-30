/** @jsx React.DOM */
var React = require('react');

var Table = require('react-bootstrap').Table;


module.exports = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired,
        getData: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            data: [],
            checkUrlTimeout: setInterval(this.checkData, 30000)
        }
    },
    componentWillUnmount: function() {
        console.log('unmount');
        clearTimeout(this.state.timeout);
    },
    checkData: function() {
        console.log('checkData');
        var data = this.props.clients.map(this.props.getData);
        this.setState({"data": data});
    },
    render: function() {
        var clients = this.state.data.map(function(entry) {
            console.log('entry', entry);
            if (entry) {
                return (
                    <tr key={entry['appspot']}>
                        <td>{entry['appspot']}</td>
                        <td>{entry['appspot_version']}</td>
                        <td>{entry['bolt_client_version']}</td>
                        <td>{entry['server_info_count']}</td>
                        <td>{entry['gce_instance_count']}</td>
                        <td>{entry['free_workers']}</td>
                        <td>{entry['max_workers']}</td>
                    </tr>
                )
            }
            else {
                return <tr></tr>
            }
        });

        return (
            <Table responsive>
                <thead>
                    <th>Appspot</th>
                    <th>Version</th>
                    <th>Client Version</th>
                    <th># ServerInfo</th>
                    <th># GCE Instances</th>
                    <th>Free Instances</th>
                    <th>Max Instances</th>
                </thead>
                <tbody>
                    {clients}
                </tbody>
            </Table>
        );
    }
});