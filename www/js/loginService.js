evote.factory('loginservices', function() {

	var pollID;

	return {
		getlink: function(){
			var url = "http://localhost:8000/api/";
			// var url = "http://104.131.170.249:8000/api/"

			return url;
		},
		setPollID: function(poll_id){
			pollID = poll_id;
		},
		getPollID: function(){
			return pollID;
		}

	}
});
