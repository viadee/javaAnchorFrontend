import {browser, by, element, until} from 'protractor';

export class DataOverviewPage {
  navigateTo() {
    return browser.get('/');
  }

  getServerSelect() {
    return element(by.id('server'));
  }

  getServerLocalH2o() {
    return this.getServerSelect().all(by.cssContainingText('option', 'local-H2O'))
  }

  selectLocalH2oServerAndWait() {
    this.getServerLocalH2o().click().then(() => {
      return browser.wait(until.elementIsEnabled(this.getModelSelect()).fn, 10000);
    });
  }

  selectLocalH2oServerWithDefaultModelAndFrame() {
    return this.navigateTo()
      .then(() => {
        this.selectLocalH2oServerAndWait();
      })
      .then(() => {
        this.getModelSelect().all(by.css('option')).get(0).click();
      })
      .then(() => {
        this.getFrameSelect().all(by.cssContainingText('option', 'TrainR')).click();
      })
      .then(() => {
        browser.wait(this.getViewBtn().click())
      });
  }

  getModelSelect() {
    return element(by.id('model'));
  }

  getFrameSelect() {
    return element(by.id('frame'));
  }

  getViewBtn() {
    return element(by.cssContainingText('a.btn.btn-dark', 'View'))
  }

  getCardDeck() {
    return element(by.css('.card-deck'))
  }

  getCards() {
    return this.getCardDeck().all(by.css('div.card'));
  }

}
