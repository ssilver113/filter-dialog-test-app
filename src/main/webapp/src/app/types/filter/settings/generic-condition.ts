import { ConditionFieldName } from '../framework/condition-field-name'
import { ConditionAmountParameter } from '../framework/condition-amount-parameter'
import { ConditionTitleParameter } from '../framework/condition-title-parameter'
import { ConditionDateParameter } from '../framework/date-parameter'

export class GenericCondition {
    rowId?: number
    field?: ConditionFieldName
    amountParameter?: ConditionAmountParameter
    titleParameter?: ConditionTitleParameter
    dateParameter?: ConditionDateParameter
    amountParameterValue?: number
    titleParameterValue?: string
    dateParameterValue?: Date
}
