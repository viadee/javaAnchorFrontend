import {browser, by} from 'protractor';
import {ModelFrameOverviewPage} from './model-frame-overview.po';

export class AnchorSetOverviewPage {

  navigateTo() {
    const initPage = new ModelFrameOverviewPage();
    return initPage.navigateTo()
      .then(() => {
        return initPage.configureAndWait();
      })
      .then(() => {
        return initPage.getFeatures();
      })
      .then((features) => {
        initPage.getExplainBtn().click();
        return features;
      });
  }

  getAnchorSetTable() {
    return browser.element(by.css('ng2-smart-table')).element(by.css('table'));
  }

  getConditionsForm() {
    return browser.element(by.css('app-case-condition-select')).element(by.css('form'));
  }

  getAnalyseBtn() {
    return browser.element(by.cssContainingText('button', 'Start analysis'))
  }

}
