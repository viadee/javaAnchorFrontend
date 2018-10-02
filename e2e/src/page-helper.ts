import {by, ElementFinder} from 'protractor';
import {ProtractorLocator} from 'protractor/built/locators';

export class PageHelper {

  getParent(child: ElementFinder, bySelector: ProtractorLocator) {
    return child.element(bySelector).element(by.xpath('..'));
  }

  getTableSiblingText(child: ElementFinder, cellText) {
    return this.getParent(child, by.cssContainingText('td', cellText))
      .all(by.css('td')).get(1).getText();
  }
}
