import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { GenericCondition } from '../../../types/filter/settings/generic-condition'
import { FilterSettingsFramework } from '../../../types/filter/framework/filter-settings-framework'

@Component({
    selector: 'app-filter-field-condition',
    templateUrl: './filter-field-condition.component.html',
    styleUrls: ['./filter-field-condition.component.scss'],
})
export class FilterFieldConditionComponent implements OnInit {
    @Input() currentCondition!: GenericCondition
    @Input() genericConditions!: GenericCondition[]
    @Input() isLastCondition!: boolean
    @Input() filterSettingsFramework!: FilterSettingsFramework
    @Input() rowCounter!: number
    @Output() rowCounterChange = new EventEmitter<number>()
    @Output() genericConditionsChange = new EventEmitter<GenericCondition[]>()

    constructor() {}

    ngOnInit(): void {
        if (!this.currentCondition.field) {
            // If completely new filter then we should init first condition here, implement in the future
        }
    }

    updateGenericConditions() {
        const currentFilterFieldConditionIndex = this.getCurrentConditionIndexInGenericConditionsArray()
        this.genericConditions[
            currentFilterFieldConditionIndex
        ] = this.currentCondition
    }

    addCondition() {
        this.genericConditions.push({
            rowId: this.rowCounter,
            field: this.filterSettingsFramework.conditionFieldNames[0],
            amountParameter: this.filterSettingsFramework
                .conditionAmountParameters[0],
            titleParameter: this.filterSettingsFramework
                .conditionTitleParameters[0],
            dateParameter: this.filterSettingsFramework
                .conditionDateParameters[0],
        })

        this.rowCounterChange.emit()
        this.genericConditionsChange.emit(this.genericConditions)
    }

    removeCondition() {
        const currentFilterFieldConditionIndex = this.getCurrentConditionIndexInGenericConditionsArray()
        this.genericConditions.splice(currentFilterFieldConditionIndex, 1)
    }

    private getCurrentConditionIndexInGenericConditionsArray() {
        return this.genericConditions.findIndex(
            (condition) => condition.rowId === this.currentCondition.rowId
        )
    }
}
