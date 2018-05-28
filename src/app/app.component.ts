import { Component } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { AnimationEvent, trigger, state, style, animate, transition, sequence } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IExportPackage } from './storage/export-package';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('checkState', [
            state('show', style({
                opacity: 1,
            })),
            state('hide', style({
                opacity: 0,
            })),
            transition('show => hide', animate('1500ms')),
            transition('hide => show', animate('0ms'))
        ])]
})
export class AppComponent {
    title = 'Loot Box Clicker';
    checkState = "hide";
    exportText: string = "";

    constructor(private _storageService: StorageService, private _modalService: NgbModal) {
    }

    open(content) {
        this._modalService.open(content).result.then((result) => {}, (reason) => {});
      }

    save() {
        this._storageService.triggerStore();
        this.checkState = "show";
        window.setTimeout(() => this.checkState = "hide", 200);
    }

    reset() {
        this._storageService.triggerReset();
    }

    import() {
        let pkg: IExportPackage = JSON.parse(this.exportText);
        this._storageService.importFromPackage(pkg);
        window.location.reload(false);
    }

    export() {
        this._storageService.triggerStore();
        window.setTimeout(() => {
            let pkg: IExportPackage = this._storageService.getExportPackage();
            this.exportText = JSON.stringify(pkg);
        }, 100)
    }
}
