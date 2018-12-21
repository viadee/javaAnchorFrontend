export interface AnchorPredicate {
  featureType: string;
  featureName: string;
  categoricalValue: string;
  conditionMin: number;
  conditionMax: number;
  addedCoverage: number;
  addedPrecision: number;
  exactCoverage: number;
}
