define(
function() {
	return {
		save: function(storageInterface, model, filename, cb) {
                        //save data
			storageInterface.savePresentation(filename, model.exportPresentation(filename), cb);
                        
		},

		open: function(storageInterface, model, filename, cb) {
                        //open data
			storageInterface.savePresentation(
				model.fileName(),
				model.exportPresentation(model.fileName()),
				function () {
					storageInterface.load(filename, function(data, err) {
						if (!err) {
							model.importPresentation(data);
						} else {
							console.log(err);
							console.log(err.stack);
						}

						cb(null, err);
					});
				});
		},
                log_in: function(){
                    alert("login");
                },
                log_out: function(){
                    alert("log_out");
                },

		new_: function(model) {
			model.newPresentation();
		}
	};
});