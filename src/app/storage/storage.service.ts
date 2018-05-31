import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { IExportPackage } from './export-package';

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
            this.autoSaveSubject.next('autosave');
        }
            , 60000);
    }

    store(key: string, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    retrieve(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    getConfig(key: string, def: any): any {
        const val = localStorage.getItem(`config-${key}`);
        if (!val) {
            return def;
        } else {
            return JSON.parse(val);
        }
    }

    setConfig(key: string, val: any) {
        this.store(`config-${key}`, val);
    }

    triggerStore() {
        this.autoSaveSubject.next('autosave');
    }

    triggerReset() {
        if (window.confirm('Do you really want to reset all your progress? There is no prestige feature or other benefit right now.')) {
            localStorage.clear();
            this.resetSubject.next('reset');
            localStorage.clear();
            window.location.reload(false);
        }
    }

    getExportPackage(): IExportPackage {
        return {
            cash: this.retrieve('cash'),
            equipment: this.retrieve('equipment'),
            inventory: this.retrieve('inventory'),
            hero: this.retrieve('hero'),
            lootBoxes: this.retrieve('lootBoxes'),
            skills: this.retrieve('skills')
        };
    }

    importFromPackage(pkg: IExportPackage) {
        this.store('cash', pkg.cash);
        this.store('equipment', pkg.equipment);
        this.store('inventory', pkg.inventory);
        this.store('hero', pkg.hero);
        this.store('lootBoxes', pkg.lootBoxes);
        this.store('skills', pkg.skills);
    }
}
