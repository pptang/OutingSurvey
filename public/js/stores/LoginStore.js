var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var currentLoginStatus = '未登入';

var LoginStore = assign({}, EventEmitter.prototype, {

	getCurrentLoginStatus: function() {
		return currentLoginStatus;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(action) {
		switch(action.actionType) {
			case 'user-login':
				currentLoginStatus = action.status;
				LoginStore.emitChange();
				break;
			case 'user-login-fail':
				currentLoginStatus = action.status;
				LoginStore.emitChange();
		}
	})
});

module.exports = LoginStore;