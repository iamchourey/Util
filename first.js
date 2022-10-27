

const BrowserWindow = require('electron').remote.BrowserWindow;
const app = require('electron');



    document.querySelector('#gobtn1').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:300,
        height:700,
        frame:false,
        resizable:false,
        alwaysOnTop:true,
        webPreferences: {
          nodeIntegration: true
        }
      });
      gitWindow.loadFile('./dist/util/index.html');
    });

    document.querySelector('#gobtn2').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700,
      });
      gitWindow.loadFile('./code-editor.html');


  });

    document.querySelector('#gobtn3').addEventListener('click',function(event){

        let gitWindow=new BrowserWindow({
          width:1100,
          height:700,
        });
        gitWindow.loadURL("https://www.github.com");


    });

    document.querySelector('#gobtn4').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.stackoverflow.com");
    });

    document.querySelector('#gobtn5').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.linkedin.com");
    });

    document.querySelector('#gobtn6').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.getbootstrap.com");
    });

    document.querySelector('#gobtn7').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.facebook.com");
    });

    document.querySelector('#gobtn8').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.instagram.com");
    });

    document.querySelector('#gobtn9').addEventListener('click',function(event){

      let gitWindow=new BrowserWindow({
        width:1100,
        height:700
      });
      gitWindow.loadURL("https://www.youtube.com");
    });
