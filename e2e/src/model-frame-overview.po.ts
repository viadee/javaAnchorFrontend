import {browser, by, element, until} from 'protractor';

export class ModelFrameOverviewPage {
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

  configureAndWait() {
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

  async getFeatures() {
    const features = [];
    this.getCards().each(card => {
      card.element(by.css('.card-header')).element(by.css('h4')).getText().then(featureName => {
        return new Promise(resolve => {
          resolve(featureName);
        });
      })
        .then(featureName => {
          features.push(featureName);
        });
    });

    return features;
  }

  configureAndGetFirstCardWithType(type: string) {
    return this.configureAndWait()
      .then(() => {
        return this.getCards().filter(card => {
          return card.all(by.cssContainingText('td', type)).count().then(count => {
            return count > 0;
          });
        }).first();
      });
  }

  getModelSelect() {
    return element(by.id('model'));
  }

  getFrameSelect() {
    return element(by.id('frame'));
  }

  getViewBtn() {
    return element(by.cssContainingText('a.btn.btn-dark', 'View'));
  }

  getCardDeck() {
    return element(by.css('.card-deck'));
  }

  getCards() {
    return this.getCardDeck().all(by.css('div.card'));
  }

  getSelectCaseForAnalysis() {
    return element(by.css('app-select-case-for-analysis'));
  }

  getAnalyseBtn() {
    return element(by.cssContainingText('a', 'Analyse'));
  }

}
