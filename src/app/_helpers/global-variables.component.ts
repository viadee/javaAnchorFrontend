import {Injectable} from "@angular/core";
import {FrameSummary} from '../_models/FrameSummary';
import {Anchor} from '../_models/Anchor';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {FeatureConditionResponse} from '../_models/FeatureConditionResponse';


@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesComponent {

  private connection: ConnectionInfo = null;

  private frameSummary: FrameSummary = null;

  private anchors: Anchor[] = null;

  private columnConditions: FeatureConditionResponse = null;

  public getFrameSummary(): FrameSummary {
    return this.frameSummary;
  }

  public setFrameSummary(frameSummary: FrameSummary): void {
    this.frameSummary = frameSummary;
  }

  public getAnchors(): Anchor[] {
    return this.anchors;
  }

  public addAnchor(anchor: Anchor): void {
    if (this.anchors == null) {
      this.anchors = [];
    }
    this.anchors.push(anchor);
  }

  public setColumnConditions(columnConditions: FeatureConditionResponse): void {
    this.columnConditions = columnConditions;
  }

  public getColumnConditions(): FeatureConditionResponse {
    return this.columnConditions;
  }

  public getConnection(): ConnectionInfo {
    return this.connection;
  }

  public updateConnectionInfo(newConn: ConnectionInfo) {
    this.connection = newConn;
    this.anchors = null;
    this.columnConditions = null;
  }

}
