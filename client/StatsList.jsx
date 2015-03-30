/** @jsx React.DOM */
var React = require('react');

var Table = require('react-bootstrap').Table;


module.exports = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired,
        getData: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {data: []}
    },
    componentWillMount: function() {
        var checkUrlTimeout = setTimeout(this.checkData, 30000);
        this.setState({timeout: checkUrlTimeout});
    },
    componentWillUnmount: function() {
        clearTimeout(this.state.timeout);
        this.setState({timeout: null})
    },
    checkData: function() {
        var data = this.props.client.map(this.props.getData);
        this.setState({data: data});
    },
    render: function() {
        var clients = this.data.map(function(entry) {
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