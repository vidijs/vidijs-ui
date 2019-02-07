const electron = require('electron');
// Module to control application life.
// Module to create native browser window.
const { app, BrowserWindow, Menu } = electron;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ webPreferences: { webSecurity: false } });
  mainWindow.maximize();

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createMenu() {
  // const application = {
  //   label: 'Application',
  //   submenu: [
  //     {
  //       label: 'About Application',
  //       selector: 'orderFrontStandardAboutPanel:',
  //     },
  //     {
  //       type: 'separator',
  //     },
  //     {
  //       label: 'Quit',
  //       accelerator: 'Command+Q',
  //       click: () => {
  //         app.quit();
  //       },
  //     },
  //   ],
  // };
  //
  // const edit = {
  //   label: 'Edit',
  //   submenu: [
  //     {
  //       label: 'Undo',
  //       accelerator: 'CmdOrCtrl+Z',
  //       selector: 'undo:',
  //     },
  //     {
  //       label: 'Redo',
  //       accelerator: 'Shift+CmdOrCtrl+Z',
  //       selector: 'redo:',
  //     },
  //     {
  //       type: 'separator',
  //     },
  //     {
  //       label: 'Cut',
  //       accelerator: 'CmdOrCtrl+X',
  //       selector: 'cut:',
  //     },
  //     {
  //       label: 'Copy',
  //       accelerator: 'CmdOrCtrl+C',
  //       selector: 'copy:',
  //     },
  //     {
  //       label: 'Paste',
  //       accelerator: 'CmdOrCtrl+V',
  //       selector: 'paste:',
  //     },
  //     {
  //       label: 'Select All',
  //       accelerator: 'CmdOrCtrl+A',
  //       selector: 'selectAll:',
  //     },
  //   ],
  // };
  //
  // const template = [
  //   application,
  //   edit,
  // ];
  //
  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { electron.shell.openExternal('https://electronjs.org'); },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' },
        ],
      },
    );

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  createMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
