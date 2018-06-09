var expect=require('expect');
var {generateMessage}=require('./message');

describe('getMessage',()=>{
	it('Should return the right object',()=>{
		var res=generateMessage('Rishabh','How you doing?');
		expect(res).toInclude({
			from:'Rishabh',
			text: 'How you doing?'
		});
		expect(res.createAt).toBeA('number');
	});
});

// expect().toInclude({
// 			firstName: "Rishabh",
// 			lastName: "Suri"
// 		});