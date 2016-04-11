var AppDispatcher = require('../dispatcher/AppDispatcher');

var LoginActions = {
	login: function(email, password) {

		$.ajax({
			url: '/api/local-login',
			dataType: 'json',
			type: 'POST',
			data: {
				email: email, 
				password: password
			},
			cache: false,
			success: function(data) {
				AppDispatcher.dispatch({
					actionType: 'user-login',
					status: "已登入"
				});
			}.bind(this),
			error: function(xhr, status, err) {
				AppDispatcher.dispatch({
					actionType: 'user-login-fail',
					status: "登入失敗"
				});
			}.bind(this)
		});

		
	}
};

module.exports = LoginActions;