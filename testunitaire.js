const VCard = require('./projet_final');

describe("Test la composition de la création VCard", function(){
	
	beforeAll(function() {

		this.p = new VCard("Vilmen", "Nathan", "WORK", "nathan.vilmen@utt.fr","CELL","0648957896");

	});
	
	it("can create a new VCard", function(){
		
		expect(this.p).toBeDefined();
		// toBe is === on simple values
		expect(this.p.N).toBe("Vilmen");
        expect(this.p.N).toBe("Nathan");
        expect(this.p.N).toBe("WORK");
        expect(this.p.N).toBe("nathan.vilmen@utt.fr");
        expect(this.p.N).toBe("CELL");
        expect(this.p.N).toBe("0648957896");
		
		
	});
});