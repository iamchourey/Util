const remote = require('electron').remote;

var quit = document.getElementById("quit");
var minimise = document.getElementById("minimise");



quit.addEventListener("click",closeWindow);
minimise.addEventListener("click",minimiseWindow);


function closeWindow(){
	 remote.getCurrentWindow().close()
}

function minimiseWindow(){
	remote.BrowserWindow.getFocusedWindow().minimize();
}

