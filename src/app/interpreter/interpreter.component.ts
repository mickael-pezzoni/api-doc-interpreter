import { Component, OnInit } from '@angular/core';
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

  collections$: Observable<RootObject[]>;
  constructor(private readonly hoppscotchService: HoppScotchService) {
    this.collections$ = this.hoppscotchService.hoppColection$
  }

  ngOnInit(): void {
  }

  trackByFn(index: number, request: Request | RootObject): number {
    return index;
  }

}
