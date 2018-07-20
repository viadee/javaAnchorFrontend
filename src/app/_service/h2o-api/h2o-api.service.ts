import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class H2oApiService {
  API_URL = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {
  }

  tryConnect(h2oInstance: string) {
    return this.httpClient.get(`${this.API_URL}/try_connect`, this.getHttpOptions(h2oInstance));
  }

  getModels(h2oInstance: string) {
    return this.httpClient.get(`${this.API_URL}/models`, this.getHttpOptions(h2oInstance));
  }

  getDataFrames(h2oInstance: string) {
    return this.httpClient.get(`${this.API_URL}/frames`, this.getHttpOptions(h2oInstance));
  }

  private getHttpOptions(h2oInstance: string) {
    return {
      headers: new HttpHeaders({
        'h2o_instance': h2oInstance
      })
    };
  }

}
