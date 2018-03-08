#AngularDeck

##Prerequisites

Install node from `https://nodejs.org/en/download/`.

###Windows

Run an administrator level powershell console and run the following commands in sequence:
```powershell
npm install -g electron 
npm install -g @angular/cli  
npm --add-python-to-path='true' --debug install --global windows-build-tools  
npm install -g electron-rebuild  
npm install --save-dev  electron-rebuild
```

###OSX

Under Construction.

## Development server

Run `ng serve` for a dev server. In another terminal window, run `electron .`   
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.  
Use the `-prod --aot=false` flags for a production build.
