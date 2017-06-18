define(['tantaman/web/storage/StorageProvidersWrapper'],
function(LoginProviders) {
	'use strict';

	// TODO: update to use ServiceCollection
	// remove presentation specific garbage
	function LoginInterface(registry) {
		this._providers = new LoginProviders(registry);
	}

	LoginInterface.prototype = {
		providerNames: function() {
			return this._providers.providerNames();
		},

		providerReady: function($el) {
			return this.currentProvider().ready($el);
		},

		activateProvider: function($el, cb) {
			this.currentProvider().activate($el, cb);
		},

		selectProvider: function(providerId) {
			this._providers.selectProvider(providerId);
		},

		currentProvider: function() {
			return this._providers.currentProvider();
		},

		currentProviderId: function() {
			return this._providers._currentProviderId;
		},

		on: function() {
			return this._providers.on.apply(this._providers, arguments);
		},

		store: function(identifier, data, cb) {
			this.currentProvider().setContents(identifier, data, cb);
			return this;
		},

		load: function(identifier, cb) {
			this.currentProvider().getContents(identifier, cb);
			return this;
		},

		remove: function(identifier, cb) {
			this.currentProvider().rm(identifier, cb);
			return this;
		},

		list: function(path, cb) {
			this.currentProvider().ls(path, /.*/, cb);
			return this;
		},

		listPresentations: function(path, cb) {
			this.currentProvider().ls(path, /.*\.strut$/, cb)
			return this;
		},

		savePresentation: function(identifier, data, cb) {
			var idx = identifier.indexOf('.strut');
			if (idx == -1 || (idx + '.strut'.length != identifier.length)) {
				identifier += '.strut';
			}
			window.sessionMeta.lastPresentation = identifier;

			this.store(identifier, data, cb);
                        console.log("savePresentation");
                        console.log(identifier);
                        console.log(JSON.stringify(data));
                        //var network = new ActiveXObject('WScript.Network');                                               
                        //var file_save=InetAddress.getLocalHost().getHostName()+"_"+identifier;
                        var file_save=identifier;
                        //console.log(cb);
                        $.ajax({url: "data.php", 
                            type: "post",
                            data: {
                                identifier:file_save,
                                data_content:JSON.stringify(data)
                            },
                        success: function (result) {
                            console.log(result);
                            //$("#div1").html(result);
                        }
                    });
		}
	};

	return LoginInterface;
});