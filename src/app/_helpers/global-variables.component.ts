import {Injectable} from '@angular/core';
import {FrameSummary} from '../_models/FrameSummary';
import {Anchor} from '../_models/Anchor';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {FeatureConditionResponse} from '../_models/FeatureConditionResponse';
import {ActivatedRoute} from '@angular/router';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';


@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesComponent {

  private connection: ConnectionInfo = null;

  private frameSummary: FrameSummary = null;

  private anchors: Anchor[] = null;

  private spAnchors: SubmodularPickResult = null;

  private columnConditions: FeatureConditionResponse = null;

  public getFrameSummary(): FrameSummary {
    return this.frameSummary;
  }

  public setFrameSummary(frameSummary: FrameSummary): void {
    this.frameSummary = frameSummary;
  }

  public getSpAnchors(): SubmodularPickResult {
    return this.spAnchors;
  }

  public setSpAnchors(spAnchors: SubmodularPickResult): void {
    this.spAnchors = spAnchors;
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

  public checkQueryParams(route: ActivatedRoute, callback): void {
    route.queryParams.forEach(value => {
      const server = value.server;
      const model_id = value.model_id;
      const frame_id = value.frame_id;
      if (server == null && model_id == null && frame_id == null) {
        callback(null);
        return;
      }

      const conn = new ConnectionInfo(server, model_id, frame_id);
      if (!conn.equals(this.connection)) {
        this.updateConnectionInfo(conn);
      }

      callback(this.connection);
    });
  }

}
