import {DataOverviewPage} from './app.po';
import {browser, by} from 'protractor';
import {until} from 'selenium-webdriver';

describe('configuration', () => {
  let page: DataOverviewPage;

  beforeEach(() => {
    page = new DataOverviewPage();
  });

  it('should display servers but models and frames are disabled', () => {
    page.navigateTo();
    expect(page.getServerSelect().all(by.tagName('option')).count()).toBe(2);
    expect(page.getModelSelect().isEnabled()).toBe(false);
    expect(page.getFrameSelect().isEnabled()).toBe(false);
  });

  it('should display models and frames', () => {
    page.navigateTo().then(() => {
      page.getServerSelect().all(by.cssContainingText('option', 'local-H2O')).click().then(() => {
        browser.wait(until.elementIsEnabled(page.getModelSelect()).fn, 10000).then(() => {
          expect(page.getModelSelect().isEnabled()).toBe(true);
          expect(page.getModelSelect().all(by.tagName('option')).count()).toBe(1);
          expect(page.getFrameSelect().isEnabled()).toBe(true);
          expect(page.getFrameSelect().all(by.tagName('option')).count()).toBe(5);
        }).catch(() => {
          fail('fail');
        });

      });
    });
  });

});
