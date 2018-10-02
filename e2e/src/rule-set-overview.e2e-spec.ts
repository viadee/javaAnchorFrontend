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
  });

  it('should generate an anchor', () => {
    let featuresFromOverview;
    page.navigateTo()
      .then((features) => {
        featuresFromOverview = features;
      })
      .then(() => {
        page.getAnalyseBtn().click();
      })
      .then(() => {
        page.getRuleSetTable().element(by.css('tbody'))
          .all(by.css('tr')).count();
      })
      .then((count) => {
        expect(count).toBe(1);
      })
      .then(() => {
        page.getRuleSetTable().element(by.css('tbody')).element(by.css('tr')).all(by.css('td')).get(6)
          .element(by.css('ul')).all(by.css('li')).count();
      })
      .then(count => {
        expect(count).toBe(featuresFromOverview.length);
      });
  });
});
