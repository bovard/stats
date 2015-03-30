/** @jsx React.DOM */
var React = require('react');

var Table = require('react-bootstrap').Table;


module.exports = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired
    },
    render: function() {
        return (
            <Table>
            </Table>
        );
    }
});