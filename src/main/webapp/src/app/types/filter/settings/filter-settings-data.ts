import { AmountCondition } from './amount-condition'
import { TitleCondition } from './title-condition'
import { DateCondition } from './date-condition'
import { GenericCondition } from './generic-condition'

export interface FilterSettingsData {
    id: number
    name: string
    amountConditions: AmountCondition[]
    titleConditions: TitleCondition[]
    dateConditions: DateCondition[]
    matchingOptionId: number

    genericConditions?: GenericCondition[]
}
