"use strict";

var classicTB2options =
{
    prefs: Components.classes["@mozilla.org/preferences-service;1"]
          .getService(Components.interfaces.nsIPrefService).getBranch("extensions.ClassicTB2opt."),

    themeName: Components.classes["@mozilla.org/preferences-service;1"]
              .getService(Components.interfaces.nsIPrefBranch).getCharPref("general.skins.selectedSkin"),

    /* Listen for changes to any preferences */
    prefsObserver:
    {
        /* Add the observer */
        register: function()
        {
            classicTB2options.prefs.addObserver("", this, false);
        },
        
        /* Called when prefs change, or on initialization */
        observe: function(branch, topic, pref) {
            /* Set the ShowMSGButtons attribute, attached to the message header */
            if(pref==="ShowMsgButtons"){
                var ShowMsgButtons = classicTB2options.prefs.getBoolPref("ShowMsgButtons");
                var MsgHeader = document.getElementById("msgHeaderView");
                
                if (MsgHeader) {
                    if(ShowMsgButtons===true)
                        MsgHeader.setAttribute("classicTB2showMsgButtons", true);
                    else
                        MsgHeader.setAttribute("classicTB2showMsgButtons", false);
                }
            }
        }
    },

    onLoad: function()
	{
        window.removeEventListener("load",classicTB2options.onload,false);
        
        /* Check that the theme is being used */
        if (classicTB2options.themeName !== "ClassicTB2")
            return;

	    classicTB2options.prefsObserver.register();
		
        /* Initialize all of the attributes */
        var obj = classicTB2options.prefs.getChildList("",{});
        for(let i = 0; i < obj.length; i += 1){
            classicTB2options.prefsObserver.observe("","",obj[i]);
        }
	}
};

window.addEventListener("load",classicTB2options.onLoad,false);

//Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService).alert(null,"Classic TB2","test");
