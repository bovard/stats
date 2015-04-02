/** @jsx React.DOM */
var React = require('react');

var Table = require('react-bootstrap').Table;
var moment = require('moment');


function createRGB(val) {
    var rgb = "#FF";
    for (var i = 0; i < 2; i++) {
        if (val < 16) {
            rgb += '0';
        }
        rgb += (Math.max(0, 255 - val)).toString(16);
    }
    return rgb
}


module.exports = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired,
        getData: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        setTimeout(this.checkData, 500);
        return {
            data: [],
            checkUrlTimeout: setInterval(this.checkData, 10000)
        }
    },
    componentWillUnmount: function() {
        clearTimeout(this.state.checkUrlTimeout);
    },
    checkData: function() {
        var data = this.props.clients.map(this.props.getData);
        this.setState({"data": data});
    },
    render: function() {
        var clients = this.state.data.filter(function(item) {
            var valid = false;
            try {
                valid = !!item && Object.keys(item).length > 0;
            } catch(err) {
                valid = false;
            }
            return valid;
        });
        clients = clients.map(function(entry) {
            var appspot = entry['appspot'];
            var appspot_version = entry['appspot_version'];
            var bolt_client_version = entry['bolt_client_version'];
            var server_info_count = entry['server_info_count'];
            var gce_instance_count = entry['gce_instance_count'];
            var free_workers = entry['free_workers'];
            var max_workers = entry['max_workers'];
            var last_updated = entry['last_updated'] && moment.utc(entry['last_updated']).fromNow();

            var server_info_error = 0;
            var gce_instance_error = 0;
            var free_workers_error = 0;
            var max_workers_error = 0;

            if (server_info_count !== gce_instance_count) {
                server_info_error += 64;
                gce_instance_error += 64;
            }

            if (server_info_count < free_workers) {
                server_info_error += 64;
                free_workers_error += 64;
            }

            if (gce_instance_count < free_workers) {
                gce_instance_error += 64;
                free_workers_error += 64;
            }

            if (server_info_count >= max_workers) {
                server_info_error += 64;
                max_workers_error += 64;
            }

            if (gce_instance_count >= max_workers) {
                gce_instance_error += 64;
                max_workers_error += 64;
            }

            var server_info_bg = createRGB(server_info_error);
            var gce_instance_bg = createRGB(gce_instance_error);
            var free_workers_bg = createRGB(free_workers_error);
            var max_workers_bg = createRGB(max_workers_error);

            return (
                <tr key={appspot}>
                    <td>{appspot}</td>
                    <td>{appspot_version}</td>
                    <td>{bolt_client_version}</td>
                    <td style={{"background-color":server_info_bg}}>{server_info_count}</td>
                    <td style={{"background-color":gce_instance_bg}}>{gce_instance_count}</td>
                    <td style={{"background-color":free_workers_bg}}>{free_workers}</td>
                    <td style={{"background-color":max_workers_bg}}>{max_workers}</td>
                    <td>{last_updated}</td>
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
                    <th>Last Updated</th>
                </thead>
                <tbody>
                    {clients}
                </tbody>
            </Table>
        );
    }
});