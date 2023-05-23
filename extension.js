const Main = imports.ui.main;
const Util = imports.misc.util;
const PopupMenu = imports.ui.popupMenu;
const { AppMenu } = imports.ui.appMenu;

function launchWithPrimeRun(executable_app) {
  let command = `prime-run ${executable_app}`;

  Util.spawn(['/bin/bash', '-c', command]);
}

function enable() {
  AppMenu.prototype._prime_runner_updateDetailsVisibility = AppMenu.prototype._updateDetailsVisibility;

  AppMenu.prototype._updateDetailsVisibility = function () {
    this.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

    this.addAction("Launch with prime-run", () => {
      const appInfo = this._app.get_app_info()
      launchWithPrimeRun(appInfo.get_commandline())
    });

    this._prime_runner_updateDetailsVisibility.call(this);
  }

  Main.overview._overview.controls.appDisplay._redisplay();
}

function disable() {
  AppMenu.prototype._updateDetailsVisibility = AppMenu.prototype._prime_runner_updateDetailsVisibility;
  delete AppMenu.prototype._prime_runner_updateDetailsVisibility;

  Main.overview._overview.controls.appDisplay._redisplay();
}