function borrowArraryMethods(obj, arr){
	
	// copy "read" basics, use cursor.toArray() if full set is required
	['forEach', 
	 'some', 
	 'every',
	 'reduce',
	 'reduceRight',
	].forEach(function(prop){
		obj[prop] = arr[prop].bind(arr);
	});
	
}

function sliceArray(arr, offset, limit){

	if(offset === 0 && limit === 0){
		return arr;
	}else if(limit === 0){
		return arr.slice(offset);
	}else {
		return arr.slice(offset, limit+offset);	
	}
	
	
}
var arrayCursor = {
	
	init:function(arr){
		this.arr = arr;
		this.reset();
	},
		
	length : function(){
		return this.sliced.length;
	},
	
	next:function(){
		return this.sliced[++this.currentIndex];
	},
	
	hasNext:function(){
		return this.currentIndex < this.length()-1;
	},
	
	toArray : function(){
		return this.sliced;
	},
	
	offset:function(offset){
		this._offset = offset;
		this.update();
	},
	
	limit:function(limit){
		this._limit = limit;
		this.update();
	},
	
	reset: function(){
		this._offset = 0;
		this._limit = 0;
		this.update();
	},
	
	update: function(){
		this.sliced = sliceArray(this.arr, this._offset, this._limit);
		borrowArraryMethods(this, this.sliced);
		this.currentIndex = -1;
	}
};

module.exports = function(arr){
	var obj = Object.create(arrayCursor);
	obj.init(arr);
	return obj;
};