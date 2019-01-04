import {AnchorPredicate} from '../_models/AnchorPredicate';
import {Anchor} from '../_models/Anchor';

export class AnchorUtil {

  static isPredicateMetric(condition: AnchorPredicate): boolean {
    return condition.featureType === 'METRIC';
  }

  static isPredicateEnum(condition: AnchorPredicate): boolean {
    return condition.featureType === 'CATEGORICAL';
  }

  /**
   * Finds the index in which the floating number differs even if the pre dot value is not the same.
   *
   * @param left
   * @param right
   */
  static roundSpecial(left: number, right: number): number {
    const truncedLeft = Math.trunc(left);
    const truncedRight = Math.trunc(right);
    if (truncedLeft === left && truncedRight === right) {
      // not a floating number
      return 0;
    } else if (truncedLeft === left || truncedRight === right) {
      // just one value is floating
      return 1;
    }

    const truncToFixedMax = 20;
    const leftZero = (left - truncedLeft).toFixed(truncToFixedMax);
    const rightZero = (right - truncedRight).toFixed(truncToFixedMax);

    for (let i = 0; i < leftZero.length; i++) {
      if (leftZero.charAt(i) !== rightZero.charAt(i)) {
        return i;
      }
    }

    return truncToFixedMax;
  }

  static getFeatureConditionTitle(condition: AnchorPredicate): string {
    if (AnchorUtil.isPredicateMetric(condition)) {
      const roundLength = AnchorUtil.roundSpecial(condition.conditionMin, condition.conditionMax);
      return '(' + condition.conditionMin.toFixed(roundLength) + ', ' + condition.conditionMax.toFixed(roundLength) + ')';
    } else if (AnchorUtil.isPredicateEnum(condition)) {
      return condition.categoricalValue;
    } else {
      console.log('unhandled column type: ' + condition.featureType);
      // TODO throw error
    }
  }

  static compareAnchorByPrediction(left: Anchor, right: Anchor): number {
    return left.prediction < right.prediction ? -1 : left.prediction === right.prediction ? 0 : 1;
  }


  static isSameFeatureCondition(conditionLeft: AnchorPredicate, conditionRight: AnchorPredicate): boolean {
    if (conditionLeft === null || conditionRight === null) {
      return false;
    }

    return conditionLeft.featureType === conditionRight.featureType
      && conditionLeft.featureName === conditionRight.featureName
      && conditionLeft.conditionMin === conditionRight.conditionMin
      && conditionLeft.conditionMax === conditionRight.conditionMax
      && conditionLeft.categoricalValue === conditionRight.categoricalValue;
  }

  static containsFeatureCondition(conditions: Array<AnchorPredicate>, condition: AnchorPredicate): boolean {
    for (const conditionInList of conditions) {
      if (AnchorUtil.isSameFeatureCondition(condition, conditionInList)) {
        return true;
      }
    }

    return false;
  }


}
