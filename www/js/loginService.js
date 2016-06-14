evote.factory('loginservices', function() {

	return {
		getlink: function(){
			var url = "http://localhost:8000/api/";
			// var url = "http://http://104.131.170.249:8000/api/"

			return url;
		}
	}
});
