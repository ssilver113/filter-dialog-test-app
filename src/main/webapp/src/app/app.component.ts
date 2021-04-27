import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    filterDialogs: number[] = []

    currentTopDialogZIndex = 1

    constructor() {}

    openFilterDialog(): void {
        this.filterDialogs.push(this.filterDialogs.length)
    }

    increaseTopDialogZIndex() {
        this.currentTopDialogZIndex++
    }
}
