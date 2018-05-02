import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageService {

    autoSaveId : number;
    autoSaveNotification: Observable<string>;
    private autoSaveSubject: Subject<string>;

    constructor() {
        this.autoSaveSubject = new Subject<string>();
        this.autoSaveNotification = this.autoSaveSubject.asObservable();
    
        this.autoSaveId = window.setInterval(() => {
            this.autoSaveSubject.next("autosave");
        }
            , 60000);
     }
    
     store(key: string, value) {
         localStorage.setItem(key, JSON.stringify(value));
     }

     retrieve(key: string) {
         return JSON.parse(localStorage.getItem(key));
     }
}