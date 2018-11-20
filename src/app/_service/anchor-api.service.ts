import {BackendApiService} from './backend-api.service';
import {FeatureConditionRequest} from '../_models/FeatureConditionRequest';
import {Observable} from 'rxjs';
import {Anchor} from '../_models/Anchor';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnchorConfigDescription} from '../_models/AnchorConfigDescription';

@Injectable({
  providedIn: 'root'
})
export class AnchorApiService {

  constructor(private http: HttpClient) {
  }

  computeRule(connectionName: string,
              model_id: string,
              frame_id: string,
              conditions: FeatureConditionRequest): Observable<Anchor> {
    return this.http.post<Anchor>(
      `${BackendApiService.getBackendUrl(connectionName)}/anchors`,
      conditions,
      BackendApiService.getHttpOptions({'Model-Id': model_id, 'Frame-Id': frame_id})
    );
  }

  runSubmodularPick(connectionName: string, model_id: string, frame_id: string): Observable<Anchor[]> {
    return this.http.get<Anchor[]>(
      `${BackendApiService.getBackendUrl(connectionName)}/anchors/global`,
      BackendApiService.getHttpOptions({'Model-Id': model_id, 'Frame-Id': frame_id})
    );
  }

  getAnchorConfigs(): Observable<Array<AnchorConfigDescription>> {
    return this.http.get<Array<AnchorConfigDescription>>(
      `${BackendApiService.getBackendUrlClean()}/anchors/config`,
      BackendApiService.getHttpOptions()
    );
  }

}
