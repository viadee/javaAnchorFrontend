import {BackendApiService} from './backend-api.service';
import {Observable} from 'rxjs';
import {FeatureConditionResponse} from '../_models/FeatureConditionResponse';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrameColumnApiService {

  constructor(private http: HttpClient) {
  }

  getCaseSelectConditions(connectionName: string, model_id: string, frame_id: string): Observable<FeatureConditionResponse> {
    return this.http.get<FeatureConditionResponse>(
      `${BackendApiService.getBackendUrl(connectionName)}/frames/${frame_id}/conditions`,
      BackendApiService.getHttpOptions()
    );
  }

}
