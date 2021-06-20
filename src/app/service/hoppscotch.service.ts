import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Request, RootObject } from '../interface/hopp-scotch-collection';

@Injectable({
  providedIn: 'root'
})
export class HoppScotchService {

  private readonly hoppKey = 'hoppCollections';
  private readonly hoppCollectionSubject$ = new ReplaySubject<RootObject[]>(1);
  hoppColection$ = this.hoppCollectionSubject$.asObservable();
  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const fileStorage = this.localStorageService.getItems(this.hoppKey) as RootObject[];
    if (fileStorage !== undefined) {
      this.hoppCollectionSubject$.next(fileStorage);
    }
  }



  updateCollection(collection: RootObject[]): void {
    const col = collection
      .map(root => {
        return {
          ...root,
          requests: root.requests.map(req => {
            return {
              ...req,
              path: this.transformPath(req.path),
              paramsUri: [...Array(this.countParams(req.path))].map((v, i) => i)
            } as Request
          })
        } as RootObject
      });

    this.hoppCollectionSubject$.next(col);
    this.localStorageService.setItem(this.hoppKey, col);
  }

  private transformPath(path: string): string {
    let countOfArg = 0;
    return path.split('/').map((arg) => {
      if (!isNaN(parseInt(arg, 10))) {
        countOfArg++;
        return `{arg${countOfArg}}`
      }
      return arg;
    }).join('/');
  }
  private countParams(path: string): number {
    let i = 0;
    return path.split('/').map(p => {
      if (!isNaN(parseInt(p, 10))) {
        ++i;
        return '{arg}i';
      }
      return p;
    }).filter(arg => arg.includes('arg')).length;
  }


}
