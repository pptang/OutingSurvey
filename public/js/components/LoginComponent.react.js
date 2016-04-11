var LoginActions = require('../actions/LoginActions');
var LoginStore = require('../stores/LoginStore');

var LoginComponent = React.createClass({
	getInitialState: function() {
		return {
			email: '',
			password: '',
			status: '未登入'
		};
	},

	componentDidMount: function() {
		LoginStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		LoginStore.removeChangeListener(this._onChange);
	},

	handleEmailChange: function(e) {
		
		this.setState({
			email: e.target.value
		});
	},

	handlePasswordChange: function(e) {
		this.setState({
			password: e.target.value
		})
	},

	handleSubmit: function() {
		
		var email = this.state.email.trim();
		var password = this.state.password.trim();
		console.log("Email:" + email + ", Pwd: " + password);
		this.setState({
			email: '',
			password: ''
		});
		LoginActions.login(this.state.email, this.state.password);
	},

	render: function() {
		return (
			<div>
				<form className="loginForm" onSubmit={this.handleSubmit}>
					<h1>Outing Survey</h1>
					<input 
						type="text" 
						placeholder="Email" 
						value={this.state.email}
						onChange={this.handleEmailChange}/>
					<input 
						type="text" 
						placeholder="Password" 
						value={this.state.value}
						onChange={this.handlePasswordChange}/>
					<input type="submit" value="Login" />
				</form>
				<p>{this.state.status}</p>
			</div>
		);
	},

	_onChange: function() {
		this.setState({
			email: '',
			password: '',
			status: LoginStore.getCurrentLoginStatus
		});
	}

});

module.exports = LoginComponent;