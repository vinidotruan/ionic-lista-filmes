import { Injectable } from '@angular/core';

let config_KEY = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: '',
    username: ''
  }

  constructor() {

  }

  getConfigData() {
    return localStorage.getItem(config_KEY);
  }

  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: '',
      username: ''
    }

    if (showSlide) {
      config.showSlide;
    }
    if (name) {
      config.name;
    }
    if (username) {
      config.username;
    }

    localStorage.setItem(config_KEY, JSON.stringify(config));

  }

}
