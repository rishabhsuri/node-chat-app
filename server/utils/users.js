class Users {
	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		this.users.push({
			id,
			name,
			room
		});
		return this.users;
	}
	removeUser(id) {
		var user = this.getUser(id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}
	getUser(id) {
		var user = this.users.filter((user) => user.id === id)[0];
		return user;
	}
	getUserList(room) {
		var users = this.users.filter((user) => user.room === room);
		var nameArray = users.map((user) => user.name);
		return nameArray;
	}
}

module.exports = {
	Users
};