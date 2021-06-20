import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from '../core/service/local-storage.service';
import { RootObject } from '../interface/hopp-scotch-collection';
import { HoppScotchService } from '../service/hoppscotch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly errorSubject$ = new Subject<string>();
  error$ = this.errorSubject$.asObservable();
  private readonly isDestroyed$ = new Subject<boolean>();
  constructor(
    private readonly hoppScotchService: HoppScotchService,
    private readonly router: Router) {
    // this.hoppScotchService.hoppColection$
    //   .pipe(takeUntil(this.isDestroyed$))
    //   .subscribe(res => {
    //     if (res !== undefined) {
    //       this.router.navigate(['interpreter']);
    //     }
    //   })
  }

  ngOnInit(): void {
  }

  async onFileDropped(event: FileList): Promise<unknown> {
    if (event.length > 1) {
      this.errorSubject$.next(`One file only`);
    } else if (!this.isJsonFile(event.item(0))) {
      this.errorSubject$.next(`File type ${event.item(0)?.type} not supported`);
    } else {
      const file = event.item(0);
      if (file !== null) {
        try {
          const content = await this.getContent(file);
          this.hoppScotchService.updateCollection(JSON.parse(content) as RootObject[]);
          this.router.navigate(['interpreter'])
        }
        catch {
          this.errorSubject$.next(`cannot be read`);
        }
      }
    }
    return;
  }

  async onFileLoad(event: Event): Promise<unknown> {
    const inputElt = event.target as HTMLInputElement;
    const file = inputElt.files?.item(0)
    if (file !== null && file !== undefined) {
      if (this.isJsonFile(file)) {
        try {
          const content = await this.getContent(file);
          this.hoppScotchService.updateCollection(JSON.parse(content) as RootObject[]);
          this.router.navigate(['interpreter'])
        }
        catch {
          this.errorSubject$.next(`cannot be read`);
        }
      }
    }
    return;
  }

  private getContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = reader.result?.toString();
        resolve(text as string);

      };
      reader.readAsText(file);
    });
  }


  private isJsonFile(file: File | null): boolean {
    return file?.type.includes('json') ?? false;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }
}
