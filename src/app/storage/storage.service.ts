import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class StorageService {

    autoSaveId: number;
    autoSaveNotification: Observable<string>;
    private autoSaveSubject: Subject<string>;

    resetNotification: Observable<string>;
    private resetSubject: Subject<string>;


    constructor() {
        this.autoSaveSubject = new Subject<string>();
        this.autoSaveNotification = this.autoSaveSubject.asObservable();

        this.resetSubject = new Subject<string>();
        this.resetNotification = this.resetSubject.asObservable();


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

    triggerStore() {
        this.autoSaveSubject.next("autosave");
    }

    triggerReset() {
        if (window.confirm("Do you really want to reset all your progress? There is no prestige feature or other benefit right now.")) {
            localStorage.clear();
            this.resetSubject.next("reset");
            localStorage.clear();
        }
    }
}