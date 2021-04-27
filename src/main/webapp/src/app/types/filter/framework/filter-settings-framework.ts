import { ConditionFieldName } from './condition-field-name'
import { ConditionAmountParameter } from './condition-amount-parameter'
import { ConditionTitleParameter } from './condition-title-parameter'
import { ConditionDateParameter } from './date-parameter'
import { ConditionMatchingOption } from './condition-matching-option'

export interface FilterSettingsFramework {
    conditionFieldNames: ConditionFieldName[]
    conditionAmountParameters: ConditionAmountParameter[]
    conditionTitleParameters: ConditionTitleParameter[]
    conditionDateParameters: ConditionDateParameter[]
    conditionMatchingOptions: ConditionMatchingOption[]
}
