import {browser, by, protractor} from 'protractor';
import {PageHelper} from './page-helper';
import {RuleSetOverviewPage} from './rule-set.po';

describe('configuration', () => {
  let page: RuleSetOverviewPage;
  let ph: PageHelper;

  let oldTimeout;
  beforeEach(() => {
    page = new RuleSetOverviewPage();
    ph = new PageHelper();
    oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
  });

  it('should view empty table', () => {
    page.navigateTo()
      .then(() => {
        return page.getRuleSetTable();
      })
      .then(table => {
        expect(table.element(by.cssContainingText('td', 'No data found')).isDisplayed())
          .toBeTruthy();
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
  });

  it('should generate an anchor', () => {
    const EC = protractor.ExpectedConditions;
    let featuresFromOverview;
    page.navigateTo()
      .then((features) => {
        featuresFromOverview = features;
      })
      .then(() => {
        page.getAnalyseBtn().click();
      })
      .then(() => {
        browser.wait(EC.invisibilityOf(page.getRuleSetTable()
          .element(by.cssContainingText('td', 'No data found'))), 120000);
      })
      .then(() => {
        return page.getRuleSetTable().$('tbody')
          .$$('tr').count();
      })
      .then((count) => {
        expect(count).toBe(1);
      })
      .then(() => {
        return page.getRuleSetTable().element(by.css('tbody')).$('tr').$$('td').get(6)
          .element(by.css('ul')).all(by.css('li')).count();
      })
      .then(count => {
        // -1 'cause target is not in instance
        expect(count).toBe(featuresFromOverview.length - 1);
      });
  });
});
