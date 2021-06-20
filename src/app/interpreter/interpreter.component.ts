import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Request, RootObject } from '../interface/hopp-scotch-collection';
import { HoppScotchService } from '../service/hoppscotch.service';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.scss']
})
export class InterpreterComponent implements OnInit {

  collections$: Observable<RootObject[] | undefined>;
  constructor(
    private readonly hoppscotchService: HoppScotchService,
    private readonly routes: Router) {
    this.collections$ = this.hoppscotchService.hoppColection$
  }

  ngOnInit(): void {
  }

  trackByFn(index: number, request: Request | RootObject): number {
    return index;
  }

  previous(): void {
    this.hoppscotchService.cleanSchema();
    this.routes.navigate(['/']);
  }

}
