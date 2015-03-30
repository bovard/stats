/** @jsx React.DOM */
var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Well = require('react-bootstrap').Well;

var MainNav = require('./MainNav');
var ClientList = require('./ClientList');
var StatsList = require('./StatsList');
var DataCollector = require('./DataCollector');

var LOCAL_CLIENT_NAME = 'asdfjklCleints';

var InterfaceComponent = React.createClass({
    getInitialState: function() {
        var localClients = localStorage.getItem(LOCAL_CLIENT_NAME);
        try {
            localClients = localClients.split(',');
        } catch(err) {
            console.log(err);
            localClients = [];
        }
        return {
            clients: localClients
        };
    },
    componentWillMount : function() {
        this.callback = (function() {
            this.forceUpdate();
        }).bind(this);

        this.props.router.on("route", this.callback);
    },
    addClient: function(name) {
        console.log(this);
        console.log(this.state);
        var newClients = this.state.clients;
        console.log("current clients ", newClients);
        newClients.push(name);
        this.setState({clients: newClients});
        localStorage.setItem(LOCAL_CLIENT_NAME, newClients);
        console.log("new clients ", newClients);
    },
    componentWillUnmount : function() {
        this.props.router.off("route", this.callback);
    },
    render: function() {
        var nav = 0;
        var content;
        if (this.props.router.current[0] == 'home') {
            nav = 1;
            content = (
                <Well>
                    <StatsList clients={this.state.clients || []} />
                </Well>
            );
        }
        if (this.props.router.current[0] == 'urls') {
            nav = 2;
            content = (
                <Well>
                    <ClientList clients={this.state.clients || []} addClient={this.addClient} />
                </Well>
            );
        }
        return (
            <div className="content">
                <MainNav current={nav} />
                <Well>
                    {content}
                </Well>
            </div>
        );
    }
});

var Router = Backbone.Router.extend({
    current: ['home'],
    routes: {
        '*actions': function(actions) {
            if (actions) {
                this.current = actions.split('/');
            } else {
                this.current = ["home"];
            }
        }
    },
});

var router = new Router();

React.renderComponent(
    <InterfaceComponent router={router} />,
    document.body
);

Backbone.history.start();