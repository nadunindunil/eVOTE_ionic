evote.factory('loginservices', function() {

	var pollID,GrpID;

	return {
		getlink: function(){
			var url = "http://localhost:8000/api/";
			//var url = "http://104.131.170.249/index.php/api/"

			return url;
		},
		setPollID: function(poll_id){
			pollID = poll_id;
		},
		getPollID: function(){
			return pollID;
		},
		setGrpID: function(g_id){
			GrpID = g_id;
			console.log(GrpID);
		},
		getGrpID: function(){
			return GrpID;
		}

	}
});
