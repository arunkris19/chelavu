var app_container = '#app-container';
var localStorage = localStorage || [];
const APPNAME = 'Chelavu';
const APPCODE = 'chelavu-1496';
/*--DEBUG:AUTOLOGIN--*/
localStorage['chelavu_web_app'] = '{ "currentuser" : "arun.avision@gmail.com" }';
/*---REMOVE---*/

/* ---------------------------------------
	App screens
 ---------------------------------------*/
var screens = {
	login_screen : '/screens/home.html',
	dashboard_screen : '/screens/dashboard.html',
	loginform : '/screens/loginform.html',
	settings_screen : '/screens/settings.html'
}
/* ---------------------------------------
	App configurations
 ---------------------------------------*/
var app = function(){
	this.main = function(){
		$('#app-bar-title').html(APPNAME+'<small>'+this.get_for_month()+'</small>');
		this.init_listeners();
		this.loadScreen(screens.login_screen);
	}
	this.loadScreen = function(screen){
		$(app_container).load(screen);
	}
	this.get_for_month = function(){
		var date = new Date();
		return ['January','February','March','April','May','June',
			'July','August','September','October','November','December'][date.getMonth()]+', '+date.getFullYear();
	}
	this.init_listeners = function(){
		var app = this;
		$('.menu').click(function(){
			app.loadScreen(screens.settings_screen);
		});
	}
};
/* ---------------------------------------
	User related configurations
 ---------------------------------------*/
var User = {
	currentuser : function(){
		var appdata = JSON.parse(localStorage['chelavu_web_app'] || '{}');
		return appdata.currentuser;
	},
	homescreen : screens.dashboard_screen
}
var localStorage = localStorage || [];
var DatabaseHelper = {
	storage_name : APPCODE+'-'+new Date().getMonth(),
	income_storage_name : APPCODE+'-income',
	app_storage : function(){
		localStorage[this.storage_name] = localStorage[this.storage_name] || '[]';
		return JSON.parse(localStorage[this.storage_name]);
	},
	push_to_app_storage : function(data,storage){
		var items = this.app_storage();
				
		items.push(data);
		var fdata = JSON.stringify(items);
		localStorage[this.storage_name] = fdata;
	},
	save_expense : function(data){
		this.push_to_app_storage(data);
	},
	mark_item_status : function(id,status){
		var items = this.app_storage();
		items[id].paid = status;
		var fdata = JSON.stringify(items);
		localStorage[this.storage_name] = fdata;
	},
	/* Incom area */
	income_storage : function(){
		localStorage[this.income_storage_name] = localStorage[this.income_storage_name] || '[]';
		return JSON.parse(localStorage[this.income_storage_name]);
	},
	save_income: function(data){
		this.push_to_income_storage(data);
	},
	push_to_income_storage : function(data,storage){
		var items = this.income_storage();
				
		items.push(data);
		var fdata = JSON.stringify(items);
		localStorage[this.income_storage_name] = fdata;
	},
	mark_income_status : function(id,status){
		var items = this.income_storage();
		items[id].active = status;
		var fdata = JSON.stringify(items);
		localStorage[this.income_storage_name] = fdata;
	}
}

var instance = new app();
instance.main();