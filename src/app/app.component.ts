import { Component } from '@angular/core';
import { StorageService } from './storage/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Loot Box Clicker';

    constructor(private _storageService: StorageService) {

    }

    save() {
        this._storageService.triggerStore();
    }
}
