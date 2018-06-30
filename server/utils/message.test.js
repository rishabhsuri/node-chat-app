var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
	it('Should return the right object',()=>{
		var res=generateMessage('Rishabh','How you doing?');
		expect(res).toInclude({
			from:'Rishabh',
			text: 'How you doing?'
		});
		expect(res.createAt).toBeA('number');
	});
});


describe('generatLocationMessage',()=>{
	it('Should generate correct location',()=>{
		var from='Rishabh',latitude='1',longitude='1';
		var res=generateLocationMessage(from,latitude,longitude);
		expect(res).toInclude({
			from,
			url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		});
	});
});
// expect().toInclude({
// 			firstName: "Rishabh",
// 			lastName: "Suri"
// 		});