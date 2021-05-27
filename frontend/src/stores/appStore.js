import { makeAutoObservable } from 'mobx';

class AppStore {
  mobileOpen = false;
  dialogOpen = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDialogOpen() {
    this.dialogOpen = !this.dialogOpen;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setMobileOpen() {
    this.mobileOpen = !this.mobileOpen;
  }
}

const appStore = new AppStore();

export default appStore;
