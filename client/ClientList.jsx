/** @jsx React.DOM */
// the React Comments tutorial from http://facebook.github.io/react/docs/tutorial.html
// replaced showdown with marked
// added propTypes
var React = require('react');

var Input = require('react-bootstrap').Input;
var Table = require('react-bootstrap').Table;


module.exports = React.createClass({
    propTypes: {
        addClient: React.PropTypes.func.isRequired,
        clients: React.PropTypes.array.isRequired
    },
    addClient: function() {
        var url = this.refs.url.getValue().trim()
        this.props.addClient(url);
        return false;
    },
    render: function() {
        var table = <div />;
        if (this.props.clients.length > 0) {
            var clients = this.props.clients.map(function(name) {
                return (
                    <tr id={name}>
                        <td>{name}</td>
                    </tr>
                );
            });
            table = (
                <Table responsive>
                    <thead>
                        <th>URL</th>
                    </thead>
                    <tbody>
                        {clients}
                    </tbody>
                </Table>
            )
        }
        return (
            <div>
                {table}
                <form className="form-horizontal" onSubmit={this.addClient}>
                    <Input
                        type="text"
                        label="Url"
                        labelClassName="col-xs-2"
                        wrapperClassName="col-xs-4"
                        ref="url" />
                    <Input
                        type="submit"
                        wrapperClassName="col-xs-offset-2 col-xs-2" />
                </form>
            </div>
        )
    }
});

