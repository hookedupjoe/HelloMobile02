(function () {
  window.ThisApp = null;
  var tmpHasLaunched = false;

  try {


    var tmpPageNames = ["Home"];
    var tmpPluginNames = ["DataTables"];

    if (typeof (window.cordova) == 'undefined') {
      window.isWeb = true;
      setup();
    }

    //---- ACTUAL CODE ==    
    ActionAppCore = ActionAppCore || window.ActionAppCore;

    var app = {
      initialize: function () {
        //document.write('<br />INIT CALLED')
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },
      onBackButton: function () {
        ThisApp.hideSidebar();
        ThisApp.closeCommonDialog();
        if (ThisApp.activePopup) {
          ThisApp.clearActivePopup();
        }
        return false;
      },
      onVolUpButton: function () {
        //alert('onVolUpButton');
        return false;
      },
      onVolDownButton: function () {
        //alert('onVolDownButton');
        return false;
      },
      onMenuButton: function () {
        ThisApp.showSidebar();
        return false;
      },
      onDeviceReady: function () {
        tmpHasLaunched = true;
        //document.write('>br />onDeviceReady')

        setup();
        this.receivedEvent('deviceready');

        document.addEventListener('backbutton', this.onBackButton.bind(this), false);
        if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined' && typeof (navigator.app.overrideButton) === 'function') {
          navigator.app.overrideButton("menubutton", true);  // <-- Add this line
        }
        document.addEventListener("menubutton", this.onMenuButton, false);
      },
      receivedEvent: function (id) {

      }
    };

    app.initialize();

  } catch (ex) {
    //document.write('INITIALL Error ' + ex.toString())
  }


  function setup() {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      //--- Items to load when the application loads
      var tmpRequired = {}


      //--- Use tmpRequiredSpecs to preload more using that example
      ThisApp.init({ pages: tmpPageNames, plugins: tmpPluginNames, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, {})

      });
    } catch (ex) {

      console.error("Unexpected Error " + ex);
    }
  }

})();
