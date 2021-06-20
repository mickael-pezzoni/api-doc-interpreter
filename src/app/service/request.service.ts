import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getRequest(url: string, queryParam?: object): Observable<unknown> {
    return this.http.get<unknown>(url, { params: this.stringifyParams(queryParam) });
  }

  postRequest(url: string, body: unknown) {
    return this.http.post<unknown>(url, body);
  }

  putRequest(url: string, body: unknown) {
    return this.http.put<unknown>(url, body);
  }

  deleteRequest(url: string): Observable<unknown> {
    return this.http.delete<unknown>(url);
  }

  patchRequest(url: string, body: unknown): Observable<unknown> {
    return this.http.patch(url, body);
  }

  private stringifyParams(customParams?: object): HttpParams {
    let params = new HttpParams();
    if (customParams === undefined) {
      return params;
    }
    Object.entries(customParams).forEach(([key, val]) => {
      if (val !== undefined) {
        params = params.append(key, String(val));
      }
    });

    return params;
  }

}
