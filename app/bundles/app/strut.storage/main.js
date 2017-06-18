define(['./view/StorageModal',
		'./view/SaveMenuItem',
		//'./view/LoginModal',
		//'./model/LoginInterface',
		'./model/StorageInterface',
		'./model/ActionHandlers',
		'tantaman/web/widgets/MenuItem',
		'lang'],
function(StorageModal,
		SaveMenuItem,
		//LoginModal,
		StorageInterface,
		ActionHandlers,
		MenuItem,
		lang) {
	'use strict';
	var storageInterface = null;
	//var loginInterface = null;

	var storageModal = null;
	//var loginModal = null;
	var $modals = $('#modals');
	
	var service = {
		createMenuItems: function(editorModel) {
			var menuItems = [];

			if (storageModal == null) {
				storageModal = new StorageModal({
					editorModel: editorModel,
					storageInterface: storageInterface
				});
				storageModal.render();
				$modals.append(storageModal.$el);
			}
                        /*
			if (loginModal == null) {
				loginModal = new LoginModal({
					editorModel: editorModel,
					loginInterface: loginInterface
				});
				loginModal.render();
				$modals.append(loginModal.$el);
			}
                        */
			
			menuItems.push(new MenuItem({ title: lang.new_, handler: ActionHandlers.new_, model: editorModel }));
			menuItems.push(new MenuItem({ title: lang.open, modal: storageModal, handler: ActionHandlers.open }));

			menuItems.push(new SaveMenuItem(storageModal, editorModel, storageInterface));
			menuItems.push(new MenuItem({title: lang.save_as, modal: storageModal, handler: ActionHandlers.save }));
			//menuItems.push(new MenuItem({title: lang.log_in, modal: loginModal, handler: ActionHandlers.log_in }));
			//menuItems.push(new MenuItem({title: lang.log_out, handler: ActionHandlers.log_in }));

			menuItems.push({
				$el: $('<li class="divider"></li>'),
				render: function() { return this; }
			});

			return menuItems;
		}
	};

	return {
		// TODO: break strut dependencies!
		initialize: function(registry) {
			storageInterface = new StorageInterface(registry);
			registry.register({
				// TODO: shouldn't be logomenuitemprovider
				// should be brought into the logo
				// based on its capabilities
				interfaces: 'strut.LogoMenuItemProvider'
			}, service);

			registry.register({
				interfaces: 'strut.StorageInterface'
			}, storageInterface)
		}
	}
});
