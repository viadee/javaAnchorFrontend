import {ModelFrameOverviewPage} from './model-frame-overview.po';
import {by} from 'protractor';
import {PageHelper} from './page-helper';

describe('model-frame-overview', () => {
  let page: ModelFrameOverviewPage;
  let ph: PageHelper;

  beforeEach(() => {
    page = new ModelFrameOverviewPage();
    ph = new PageHelper();
  });

  it('should display servers but models and frames are disabled', () => {
    page.navigateTo();
    expect(page.getServerSelect().all(by.tagName('option')).count()).toBe(2);
    expect(page.getModelSelect().isEnabled()).toBe(false);
    expect(page.getFrameSelect().isEnabled()).toBe(false);
  });

  it('should display models and frames', () => {
    page.navigateTo()
      .then(() => {
        page.selectLocalH2oServerAndWait();
      })
      .then(() => {
        expect(page.getModelSelect().isEnabled()).toBe(true);
        expect(page.getModelSelect().all(by.tagName('option')).count()).toBe(1);
        expect(page.getFrameSelect().isEnabled()).toBe(true);
        expect(page.getFrameSelect().all(by.tagName('option')).count()).toBe(2);
      })
      .catch((err) => {
        fail(err);
      });
  });

  it('should load the summary with list of cards', () => {
    page.configureAndWait()
      .then(() => {
        return expect(page.getCards().count())
          .toBeGreaterThan(0);
      })
      .catch((err) => {
        fail(err);
      });
  });

  it('should view cards with type real with summary', () => {
    page.configureAndGetFirstCardWithType('int')
      .then(card => {
        ph.getTableSiblingText(card, 'Min').then(minString => {
          ph.getTableSiblingText(card, 'Max').then(maxString => {

            // TODO handle i18n
            const min = Number.parseInt(minString.replace(/[^\d\.\-]/g, ''));
            const max = Number.parseInt(maxString.replace(/[^\d\.\-]/g, ''));

            expect(max - min).toBeGreaterThan(0);

            ph.getTableSiblingText(card, 'Mean').then(meanString => {
              const mean = Number.parseInt(meanString.replace(/[^\d\.\-]/g, ''));
              expect(mean).toBeGreaterThanOrEqual(min);
              expect(mean).toBeLessThanOrEqual(max);
            })
          });
        });

        ph.getTableSiblingText(card, 'Missing').then(missing => {
          expect(Number(missing)).toBeGreaterThanOrEqual(0);
        })
      });
  });

  it('should view cards with type enum', () => {
    page.configureAndGetFirstCardWithType('enum')
      .then(card => {
        ph.getTableSiblingText(card, 'Missing').then(missing => {
          expect(missing).toBeGreaterThanOrEqual(0);
        });
        ph.getTableSiblingText(card, 'Unique').then(unique => {
          expect(unique).toBeGreaterThan(0);
        });

        return card;
      }).then(card => {
      card.element(by.css('table')).element(by.css('tbody')).all(by.css('tr')).count().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  it('should view the first 100 instances of the data set', () => {
    page.configureAndWait()
      .then(() => {
        page.getSelectCaseForAnalysis().element(by.css('thead')).all(by.css('tr')).first()
          .all(by.css('th')).count().then((count) => {
          expect(count).toBeGreaterThan(0);
        })
      })
      .then(() => {
        page.getSelectCaseForAnalysis().element(by.css('tbody')).all(by.css('tr')).count().then((count) => {
          expect(count).toBe(10);
        })
      })
      .then(() => {
        page.getSelectCaseForAnalysis().element(by.css('nav')).element(by.css('ul')).$$('li').count().then(count => {
          expect(count).toBe(8);
        })
      })
  });

});


