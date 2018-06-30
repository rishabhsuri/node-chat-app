const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Rishabh',
			room: 'Flat 5105'
		}, {
			id: '2',
			name: 'Jen',
			room: 'Flat 5105'
		}, {
			id: '3',
			name: 'Harsh',
			room: 'Flat 5017'
		}];
	});

	it('Should add users', () => {
		var users = new Users();
		var user = {
			id: '669',
			name: 'Rishabh',
			room: 'Flat 5105'
		};
		users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('Should remove user',()=>{
		var user=users.removeUser('2');
		expect(user.name).toBe('Jen');
		expect(users.users.length).toBe(2);
	});

	it('Should return user for id 3',()=>{
		var user=users.getUser('3');
		expect(user.name).toBe('Harsh');
	});

	it('Should return names for Flat 5105',()=>{
		var userList=users.getUserList('Flat 5105');
		expect(userList).toEqual(['Rishabh','Jen']);
	});
});