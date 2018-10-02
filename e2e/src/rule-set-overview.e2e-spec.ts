import {by} from 'protractor';
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
        return page.getRuleSetTable();
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
      .then(() => {
        featuresFromOverview.forEach(feature => {
          expect(page.getConditionsForm().$('#id_' + String(feature)
            .replace(/\./g, '\\.'))
            .isPresent()).toBe(true).catch(err => {
            fail(feature + ": " + err);
          });
        });
      });
  })
});
