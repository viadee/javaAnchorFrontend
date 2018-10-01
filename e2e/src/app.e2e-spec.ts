import {DataOverviewPage} from './app.po';
import {by} from 'protractor';
import {PageHelper} from './page-helper';

describe('configuration', () => {
  let page: DataOverviewPage;
  let ph: PageHelper;

  beforeEach(() => {
    page = new DataOverviewPage();
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
        expect(page.getFrameSelect().all(by.tagName('option')).count()).toBe(4);
      })
      .catch((err) => {
        fail(err);
      });
  });

  it('should load the summary with list of cards', () => {
    page.selectLocalH2oServerWithDefaultModelAndFrame()
      .then(() => {
        return expect(page.getCards().count())
          .toBeGreaterThan(0);
      })
      .catch((err) => {
        fail(err);
      });
  });

  it('should view cards with type real and enum with summary', () => {
    page.selectLocalH2oServerWithDefaultModelAndFrame()
      .then(() => {
        return page.getCards();
      })
      .then(cards => {
        cards = cards.filter(card => {
          return card.all(by.cssContainingText('td', 'int')).count().then((value) => {
            return value > 0;
          })
        });
        expect(cards.length).toBeGreaterThan(0);
        return cards;
      })
      .then(intCards => {
        const card = intCards[0];

        ph.getParent(card, by.cssContainingText('td', 'Min'))
          .all(by.css('td')).get(1).getText().then(min => {
          ph.getParent(card, by.cssContainingText('td', 'Max'))
            .all(by.css('td')).get(1).getText().then(max => {

            expect(Number(max) - Number(min)).toBeGreaterThan(0);

            ph.getParent(card, by.cssContainingText('td', 'Mean'))
              .all(by.css('td')).get(1).getText().then(mean => {
                expect(Number(mean)).toBeGreaterThanOrEqual(Number(min));
                expect(Number(mean)).toBeLessThanOrEqual(Number(max));
            })
          });
        });

        ph.getParent(card, by.cssContainingText('td', 'Missing'))
          .all(by.css('td')).get(1).getText().then(missing => {
            expect(Number(missing)).toBeGreaterThanOrEqual(0);
        })
      });
  })

});


