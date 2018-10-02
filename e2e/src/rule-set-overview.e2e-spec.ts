import {browser, by} from 'protractor';
import {PageHelper} from './page-helper';
import {RuleSetOverviewPage} from './rule-set.po';

describe('configuration', () => {
  let page: RuleSetOverviewPage;
  let ph: PageHelper;

  beforeEach(() => {
    page = new RuleSetOverviewPage();
    ph = new PageHelper();
  });

  it('should view empty table', () => {
    page.navigateTo()
      .then(() => {
        return browser.element(by.css('ng-2-smart-table')).element(by.css('table'))
      })
      .then(table => {
        table.element(by.cssContainingText('td', 'No data found'))
      });
  });

  it('should have all features as dropdown', () => {
    let featuresFromOverview;
    page.navigateTo()
      .then((features) => {
        featuresFromOverview = features;
      })
      .then(table => {

      });
  })
});
