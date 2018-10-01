import {by, ElementFinder} from 'protractor';
import {ProtractorLocator} from 'protractor/built/locators';

export class PageHelper {

  getParent(child: ElementFinder, bySelector: ProtractorLocator) {
    return child.element(bySelector).element(by.xpath('..'));
  }
}
