import {BackendApiService} from './backend-api.service';
import {FeatureConditionRequest} from '../_models/FeatureConditionRequest';
import {Observable} from 'rxjs';
import {Anchor} from '../_models/Anchor';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnchorConfigDescription} from '../_models/AnchorConfigDescription';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';

@Injectable({
  providedIn: 'root'
})
export class AnchorApiService {

  constructor(private http: HttpClient) {
  }

  computeRule(connectionName: string,
              model_id: string,
              frame_id: string,
              conditions: FeatureConditionRequest,
              anchorParameter?: Array<AnchorConfigDescription>): Observable<Anchor> {
    const httpHeader = this.createHttpOptionsWithAnchorConfig(model_id, frame_id, anchorParameter);
    return this.http.post<Anchor>(
      `${BackendApiService.getBackendUrl(connectionName)}/anchors`,
      conditions,
      BackendApiService.getHttpOptions(httpHeader)
    );
  }

  runSubmodularPick(connectionName: string, model_id: string, frame_id: string,
                    anchorParameter?: Array<AnchorConfigDescription>): Observable<SubmodularPickResult> {
    const httpHeader = this.createHttpOptionsWithAnchorConfig(model_id, frame_id, anchorParameter);
    return this.http.get<SubmodularPickResult>(
      `${BackendApiService.getBackendUrl(connectionName)}/anchors/global`,
      BackendApiService.getHttpOptions(httpHeader)
    );
  }

  getAnchorConfigs(): Observable<Array<AnchorConfigDescription>> {
    return this.http.get<Array<AnchorConfigDescription>>(
      `${BackendApiService.getBackendUrlClean()}/anchors/config`,
      BackendApiService.getHttpOptions()
    );
  }

  createHttpOptionsWithAnchorConfig(model_id: string,
                                    frame_id: string,
                                    anchorParameter?: Array<AnchorConfigDescription>):
    string | { [name: string]: string | string[]; } {
    const httpHeader = {};
    httpHeader['Model-Id'] = model_id;
    httpHeader['Frame-Id'] = frame_id;

    if (anchorParameter && anchorParameter.length > 0) {
      for (const config of anchorParameter) {
        httpHeader[config.configName] = config.value;
      }
    }

    return httpHeader;
  }

}
