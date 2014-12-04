var arrayCursor = require('./index');

describe('array-cursor', function () {

	describe('creating', function () {
		it('should create cursor from array', function () {
			var cursor = arrayCursor([1, 2, 3]);
			expect(cursor).to.exist;
		});
	});

	describe('#toArray', function () {
		it('should array', function () {
			var cursor = arrayCursor([1, 2, 3]);
			expect(Array.isArray(cursor.toArray())).to.equal(true);

		});
	});

	describe('#size', function () {
		it('should have same size as length of array', function () {
			var cursor = arrayCursor([1, 2, 3]);
			expect(cursor.length()).to.equal(3);
		});
	});

	describe('#forEach', function () {
		it('should call visitor for each element in order', function () {
			var cursor = arrayCursor([0, 1, 2]);
			cursor.forEach(function (element, index) {
				expect(element).to.equal(index);
			});

		});
	});

	describe('#next', function () {
		it('should return next element in array', function () {
			var cursor = arrayCursor([1, 2, 3]);
			var next = cursor.next();
			expect(next).to.equal(1);

		});
	});

	describe('#hasNext', function () {
		it('should return true if underlying array has more elements', function () {
			var cursor = arrayCursor([1]);
			expect(cursor.hasNext()).to.equal(true);

		});

		it('should return false if underlying array is empty', function () {
			var cursor = arrayCursor([]);
			expect(cursor.hasNext()).to.equal(false);

		});

		it('should return false if underlying array has no more elements', function () {
			var cursor = arrayCursor([1]);
			cursor.next();
			expect(cursor.hasNext()).to.equal(false);

		});
	});

	describe('#offset', function () {
		it('it should return array with correct offset', function () {
			var cursor = arrayCursor([1, 2, 3]);
			cursor.offset(1);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(2);
			expect(arr[0]).to.equal(2);
			expect(arr[1]).to.equal(3);

		});

		it('it should be possible to reset offset', function () {
			var cursor = arrayCursor([1, 2, 3]);
			cursor.offset(1);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(2);
			expect(arr[0]).to.equal(2);
			expect(arr[1]).to.equal(3);
			cursor.offset(0);
			arr = cursor.toArray();
			expect(arr.length).to.equal(3);
			expect(arr[0]).to.equal(1);
			expect(arr[1]).to.equal(2);
			expect(arr[2]).to.equal(3);

		});
	});

	describe('#limit', function () {
		it('it should return array with correct limit', function () {
			var cursor = arrayCursor([1, 2, 3, 4, 5, 6]);
			cursor.limit(3);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(3);
			expect(arr[0]).to.equal(1);
			expect(arr[1]).to.equal(2);
			expect(arr[2]).to.equal(3);
			expect(arr[3]).to.be.undefined;

		});

		it('it should be possible to reset limit', function () {
			var cursor = arrayCursor([1, 2, 3, 4, 5, 6]);
			cursor.limit(3);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(3);
			expect(arr[0]).to.equal(1);
			expect(arr[1]).to.equal(2);
			expect(arr[2]).to.equal(3);
			expect(arr[3]).to.be.undefined;
			cursor.limit(2);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(2);
			expect(arr[0]).to.equal(1);
			expect(arr[1]).to.equal(2);
			expect(arr[2]).to.be.undefined;

		});
	});

	describe('#offset and limit', function () {
		it('it should return array with correct offset and limit', function () {
			var cursor = arrayCursor([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			cursor.offset(3);
			cursor.limit(3);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(3);
			expect(arr[0]).to.equal(4);
			expect(arr[1]).to.equal(5);
			expect(arr[2]).to.equal(6);
			expect(arr[3]).to.be.undefined;

		});
	});

	describe('#resest', function () {
		it('it should reset to original array', function () {
			var cursor = arrayCursor([1, 2, 3, 4]);
			cursor.offset(1);
			cursor.limit(2);
			var arr = cursor.toArray();
			expect(arr.length).to.equal(2);
			expect(arr[0]).to.equal(2);
			expect(arr[1]).to.equal(3);


			cursor.reset();
			var arr = cursor.toArray();
			expect(arr.length).to.equal(4);
			expect(arr[0]).to.equal(1);
			expect(arr[1]).to.equal(2);
			expect(arr[2]).to.equal(3);
			expect(arr[3]).to.equal(4);


		});
	});


});