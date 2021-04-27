import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    Output,
    ViewChild,
    EventEmitter,
    OnInit,
    Renderer2,
} from '@angular/core'

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit, AfterViewInit {
    @Input() dialogId!: number
    @Input() filterDialogs!: number[]
    @Input() currentTopDialogZIndex!: number
    @Output() increaseTopDialogZIndex = new EventEmitter()
    @ViewChild('resizeBox') resizeBox!: ElementRef // note: be careful with this, only use Renderer2 for safer DOM manipulation
    @ViewChild('dragHandleBottom') dragHandleBottom!: ElementRef
    @ViewChild('dialogContent') dialogContent!: ElementRef

    titleBarHeight = 25
    bottomBarHeight = 10
    dialogHeight = 600
    dialogWidth = 900
    dialogZIndex = 1

    constructor(private ngZone: NgZone, private renderer: Renderer2) {}

    ngOnInit() {
        this.dialogZIndex = this.currentTopDialogZIndex
    }

    ngAfterViewInit() {
        this.setHeightHandleTransform()
    }

    /* dialogs should open in the middle of the page (calculate from view center and dialog size ; new dialogs should be slightly offset */
    getDialogLocationTop(dialogId: number) {
        const offsetCounter = dialogId < 10 ? dialogId : 10 // avoid dialogs moving outside user window
        return this.dialogHeight / 2 - offsetCounter * 25
    }

    getDialogLocationLeft(dialogId: number) {
        const offsetCounter = dialogId < 10 ? dialogId : 10
        return this.dialogWidth / 2 - offsetCounter * 25
    }

    bringToFront() {
        this.dialogZIndex = this.currentTopDialogZIndex + 1
        this.increaseTopDialogZIndex.emit()
    }

    closeDialog(dialogId: number) {
        const index = this.filterDialogs.findIndex((id) => id === dialogId)
        this.filterDialogs.splice(index, 1)
    }

    resizeHeight() {
        this.ngZone.runOutsideAngular(() => {
            const target = this.resizeBox.nativeElement
            const dragRect = this.dragHandleBottom.nativeElement.getBoundingClientRect()
            const targetRect = target.getBoundingClientRect()
            let height = dragRect.top - targetRect.top + dragRect.height
            height = height < 200 ? 200 : height

            this.renderer.setStyle(target, 'height', `${height}px`)
            this.setHeightHandleTransform()
        })
    }

    private setHeightHandleTransform() {
        const dragHandle = this.dragHandleBottom.nativeElement
        const targetRect = this.resizeBox.nativeElement.getBoundingClientRect()
        const dragRect = dragHandle.getBoundingClientRect()
        const translateY =
            targetRect.height - dragRect.height - this.titleBarHeight
        const dialogContentElement = this.dialogContent.nativeElement

        this.renderer.setStyle(
            dialogContentElement,
            'maxHeight',
            `${
                targetRect.height - this.titleBarHeight - this.bottomBarHeight
            }px`
        )

        this.renderer.setStyle(
            dragHandle,
            'transform',
            `translate3d(0, ${translateY}px, 0)`
        )
    }
}
