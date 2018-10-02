import {browser, by, element, until} from 'protractor';
import {ModelFrameOverviewPage} from './model-frame-overview.po';
import elementIsVisible = until.elementIsVisible;

export class RuleSetOverviewPage {

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
        initPage.getAnalyseBtn().click();
        return features;
      })
      .then((features) => {
        browser.wait(elementIsVisible(element(by.css('app-ruleset-overview'))), 5000);
        return features;
      });
  }

  getConditionsForm() {
    return browser.element(by.css('app-case-condition-select')).element(by.css('form'));
  }

}
