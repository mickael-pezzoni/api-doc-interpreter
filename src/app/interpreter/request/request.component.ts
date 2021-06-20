import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Param, Request } from 'src/app/interface/hopp-scotch-collection';
import { RequestService } from 'src/app/service/request.service';

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const PATCH = "PATCH";
const DELETE = "DELETE";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() request!: Request;
  response$: Observable<unknown> | undefined;
  loading = false;
  argument: number[];
  params: string[];
  constructor(private readonly requestService: RequestService) {
    this.argument = this.request?.paramsUri ?? [];
    this.params = this.request?.params?.map(p => p.value) ?? [];

  }

  ngOnInit(): void {
  }


  hasBody(): boolean {
    return this.request.method === 'POST' || this.request.method === 'PUT';
  }

  execRequest(): void {
    this.loading = true;
    let fullUrl = `${this.request.url}${this.request.path}`;
    this.argument.forEach((a, i) => {
      fullUrl = fullUrl.replace(`{arg${i + 1}}`, a.toString())
    });
    if (this.params.length > 0) {
      fullUrl += this.formatParams();
    }
    switch (this.request.method) {
      case GET:
        this.response$ = this.requestService.getRequest(
          fullUrl
        );
        break;
      case POST:
        this.response$ = this.requestService.postRequest(
          fullUrl,
          JSON.parse(this.request.rawParams)
        );
        break;
      case PUT:
        this.response$ = this.requestService.putRequest(
          fullUrl,
          JSON.parse(this.request.rawParams)
        );
        break;
      case PATCH: {
        this.response$ = this.requestService.patchRequest(
          fullUrl,
          JSON.parse(this.request.rawParams)
        );
        break;
      }
      case DELETE:
        this.response$ = this.requestService.deleteRequest(
          fullUrl
        );
        break
    }
  }

  private formatParams(): string {
    return this.params.map((v, i) => {
      let currentParam = '';
      if (i === 0) {
        currentParam += '?';
      } else {
        currentParam += '&';
      }
      if (this.request.params !== undefined) {
        currentParam += `${this.request.params[i].key}=${v}`;
      }
      return currentParam;
    }).join('');
  }

}
