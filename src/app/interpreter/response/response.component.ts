import { Component, Input, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() loading!: boolean;
  error: Error | undefined;
  response$!: Observable<unknown> | undefined;
  @Input() set response(res: Observable<unknown> | undefined) {
    this.response$ = res?.pipe(
      tap(() => {
        this.loading = false;
        this.error = undefined;
      }),
      catchError(err => {
        this.loading = false
        this.error = err as Error;
        return throwError(err);
      })
    );
  }
  constructor() { }

  ngOnInit(): void {
  }

}
