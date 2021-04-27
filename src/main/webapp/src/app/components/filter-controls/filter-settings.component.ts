import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FilterSettingsData } from '../../types/filter/settings/filter-settings-data'
import { FilterSettingsFramework } from '../../types/filter/framework/filter-settings-framework'

@Component({
    selector: 'app-filter-settings',
    templateUrl: './filter-settings.component.html',
    styleUrls: ['./filter-settings.component.scss'],
})
export class FilterSettingsComponent implements OnInit {
    isLoadingSettings = false
    filterSettingsFramework!: FilterSettingsFramework
    filterSettingsData!: FilterSettingsData
    rowCounter = 0
    isEdit = true // for demo purposes only

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private changeDet: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.isLoadingSettings = true
        this.getFilterSettingsFromAPI()
    }

    getFilterSettingsFromAPI() {
        this.http
            .get<FilterSettingsFramework>('v1/filter-settings-framework')
            .subscribe((filterSettingsFramework: FilterSettingsFramework) => {
                this.filterSettingsFramework = filterSettingsFramework

                /* For demo purposes only, we are always pre-loading with setting 1 */
                this.http
                    .get<FilterSettingsData>('v1/filter-settings/1')
                    .subscribe((filterSettingsData: FilterSettingsData) => {
                        this.setFilterSettings(filterSettingsData)
                    })
            })
    }

    applyFilter() {
        // Implement in the future
        this.snackBar.open('TODO', 'Note', {
            duration: 2000,
        })
    }

    saveFilterSettings() {
        this.isLoadingSettings = true

        if (
            this.hasNoName() ||
            this.hasMissingConditionValue() ||
            this.hasMissingMatchingOption()
        ) {
            this.snackBar.open('Problem with inputs', 'Error', {
                duration: 2000,
            })
            this.isLoadingSettings = false
        } else if (this.isEdit) {
            this.generateSpecificConditionTypesFromGenericConditions()

            this.http
                .put<FilterSettingsData>(
                    `v1/filter-settings/${this.filterSettingsData.id}`,
                    this.filterSettingsData
                )
                .subscribe((filterSettingsData) => {
                    if (filterSettingsData.id) {
                        this.setFilterSettings(filterSettingsData)
                        this.snackBar.open('Filter settings saved', 'Success', {
                            duration: 2000,
                        })
                    } else {
                        this.snackBar.open('Problem with saving', 'Error', {
                            duration: 2000,
                        })
                    }
                })
        }
    }

    clearFilter() {
        // Implement in the future
        this.snackBar.open('TODO', 'Note', {
            duration: 2000,
        })
    }

    updateGenericConditions($event: any) {
        this.filterSettingsData.genericConditions = $event
    }

    increaseRowCounter() {
        this.rowCounter++
        this.changeDet.detectChanges()
    }

    private setFilterSettings(filterSettingsData: FilterSettingsData) {
        this.filterSettingsData = filterSettingsData
        this.generateGenericConditionsFromSpecificConditionTypes()
        this.isLoadingSettings = false
    }

    /* Modify different type conditions to one type - not ideal, but it's easier to manage data this way (could be improved with more time later) */
    private generateGenericConditionsFromSpecificConditionTypes() {
        this.filterSettingsData.genericConditions = []

        this.filterSettingsData.amountConditions.forEach((amountCondition) => {
            if (amountCondition.parameterId && amountCondition.value) {
                this.filterSettingsData.genericConditions?.push({
                    rowId: this.rowCounter++,
                    field: this.getConditionFieldNameById(1),
                    amountParameter: this.getConditionAmountParameterById(
                        amountCondition.parameterId
                    ),
                    amountParameterValue: amountCondition.value,
                })
            }
        })

        this.filterSettingsData.titleConditions.forEach((titleCondition) => {
            if (titleCondition.parameterId && titleCondition.value) {
                this.filterSettingsData.genericConditions?.push({
                    rowId: this.rowCounter++,
                    field: this.getConditionFieldNameById(2),
                    titleParameter: this.getConditionTitleParameterById(
                        titleCondition.parameterId
                    ),
                    titleParameterValue: titleCondition.value,
                })
            }
        })

        this.filterSettingsData.dateConditions.forEach((dateCondition) => {
            if (dateCondition.parameterId && dateCondition.value) {
                this.filterSettingsData.genericConditions?.push({
                    rowId: this.rowCounter++,
                    field: this.getConditionFieldNameById(3),
                    dateParameter: this.getConditionDateParameterById(
                        dateCondition.parameterId
                    ),
                    dateParameterValue: dateCondition.value,
                })
            }
        })
    }

    private generateSpecificConditionTypesFromGenericConditions() {
        this.filterSettingsData.amountConditions = []
        this.filterSettingsData.titleConditions = []
        this.filterSettingsData.dateConditions = []

        this.filterSettingsData.genericConditions?.forEach(
            (genericCondition) => {
                if (genericCondition.field?.id == 1) {
                    this.filterSettingsData.amountConditions?.push({
                        parameterId: genericCondition.amountParameter?.id,
                        value: genericCondition.amountParameterValue,
                    })
                }
                if (genericCondition.field?.id == 2) {
                    this.filterSettingsData.titleConditions?.push({
                        parameterId: genericCondition.titleParameter?.id,
                        value: genericCondition.titleParameterValue,
                    })
                }
                if (genericCondition.field?.id == 3) {
                    this.filterSettingsData?.dateConditions.push({
                        parameterId: genericCondition.dateParameter?.id,
                        value: genericCondition.dateParameterValue,
                    })
                }
            }
        )
    }

    private getConditionFieldNameById(id: number) {
        return this.filterSettingsFramework!.conditionFieldNames!.find(
            (f) => f.id === id
        )
    }

    private getConditionAmountParameterById(id: number) {
        return this.filterSettingsFramework!.conditionAmountParameters.find(
            (p) => p.id === id
        )
    }

    private getConditionTitleParameterById(id: number) {
        return this.filterSettingsFramework!.conditionTitleParameters!.find(
            (p) => p.id === id
        )
    }

    private getConditionDateParameterById(id: number) {
        return this.filterSettingsFramework!.conditionDateParameters!.find(
            (p) => p.id === id
        )
    }

    private hasNoName() {
        return (
            !this.filterSettingsData.name ||
            this.filterSettingsData.name.length === 0
        )
    }

    private hasMissingConditionValue() {
        return (
            !this.filterSettingsData.genericConditions ||
            this.filterSettingsData.genericConditions.some(
                (c) =>
                    (c.field?.id === 1 &&
                        (!c.amountParameter || !c.amountParameterValue)) ||
                    (c.field?.id === 2 &&
                        (!c.titleParameter ||
                            !c.titleParameterValue ||
                            c.titleParameterValue.length === 0)) ||
                    (c.field?.id === 3 &&
                        (!c.dateParameter || !c.dateParameterValue))
            )
        )
    }

    private hasMissingMatchingOption() {
        return !this.filterSettingsData.matchingOptionId
    }
}
