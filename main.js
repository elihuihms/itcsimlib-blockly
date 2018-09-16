/*
 * Imports
 */

const {app, dialog, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");

/*
 * Environment global
 */

var env = {};

env.dirname = __dirname;
env.cwd = null;
env.fname = "script.py";
env.client;
env.python = null; // script process

function createWindow(){
	window = new BrowserWindow({width: 800, height: 600});
	window.loadFile("gui/index.html");
	//window.openDevTools();
}

function runScript(code){
	const path_script = path.join(env.cwd, path.sep, env.fname);
	const path_stdout = path.join(env.cwd, path.sep, "stdout.txt");
	const path_stderr = path.join(env.cwd, path.sep, "stderr.txt");

	fs.writeFile(path_script, code, (err) => {
		if( err ){
			env.client.send("action-senderror", "Could not save script.");
		}else if( env.python !== null){
			env.client.send("action-senderror", "Script still running.");
		}else {
			fs.writeFileSync(path_stdout, "");
			fs.writeFileSync(path_stderr, "");

			env.client.send("action-sendstatus", "running");

			env.python = require("child_process").spawn(
				"python", [env.fname],
				{cwd:env.cwd}
			);

			env.python.on("error", (err) => {
				env.client.send("action-senderror", "Script execution error: "+err);
			});
			
			env.python.stdout.on("data", (data) => {
				console.log("stdout: ",data.toString("utf8"));
				fs.appendFileSync(path_stdout, data);
			});

			env.python.stderr.on("data", (data) => {
				console.log("stderr: ",data.toString("utf8"));
				env.client.send("action-senderror", data.toString("utf8"));
				fs.appendFileSync(path_stderr, data);
			})

			env.python.on("close", (code) => {
				console.log(code);
				env.client.send("action-sendstatus", "done");
				env.python = null;
			});
		}
	});
}

/*
 * IPC responders / generators 
 */

ipcMain.on("action-init", (event, arg) => {
	/* setup the IPC relationship, send back environment config info */
	env.client = event.sender;
	event.sender.send("action-sendlib", env);
})

ipcMain.on("action-setcwd", (event, arg) => {
	setCwd();
	event.sender.send("action-sendcwd", env.cwd);
});

ipcMain.on("action-runscript", (event, code) => {
	console.log("RECIEVED SCRIPT");

	if( env.cwd === null ){ /* set up current working dir if not already set */
		env.cwd = dialog.showOpenDialog({
			properties:['openDirectory', 'createDirectory']
		});
		
		if( env.cwd.length < 1 )
			return;

		env.cwd = env.cwd[0];
		env.client.send("action-sendcwd", env.cwd);
	}

	runScript(code);
});

ipcMain.on("action-killscript", (event, code) => {
	if( env.python !== null){
		env.python.kill("SIGINT");
		env.client.send("action-senderror", "Script execution terminated");
	}else{
		env.client.send("action-senderror", "No running script");
	}
	
});

/*
 * Setup and close
 */

app.on("ready", createWindow)

app.on("window-all-closed", function(){
	app.quit();
});