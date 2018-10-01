import {browser, by, element, ProtractorBrowser} from 'protractor';

export class DataOverviewPage {
  navigateTo() {
    return browser.get('/');
  }

  getServerSelect() {
    return element(by.id('server'));
  }

  getModelSelect() {
    return element(by.id('model'));
  }

  getFrameSelect() {
    return element(by.id('frame'));
  }

}
