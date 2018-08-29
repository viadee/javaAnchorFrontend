import {Injectable} from "@angular/core";
import {FrameSummary} from '../_models/FrameSummary';
import {Rule} from '../_models/Rule';


@Injectable()
export class GlobalVariablesComponent {

  private frameSummary: FrameSummary = null;

  private rules: Rule[] = null;

  public getFrameSummary(): FrameSummary {
    return this.frameSummary;
  }

  public setFrameSummary(frameSummary: FrameSummary): void {
    this.frameSummary = frameSummary;
  }

  public getRules(): Rule[] {
    return this.rules;
  }

  public setRules(rules): void {
    this.rules = rules;
  }

  public addRule(rule: Rule): void {
    if (this.rules == null) {
      this.rules = [];
    }

    this.rules.push(rule)
  }

}
