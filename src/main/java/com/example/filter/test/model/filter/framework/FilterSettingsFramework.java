package com.example.filter.test.model.filter.framework;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FilterSettingsFramework {
	List<ConditionFieldName> conditionFieldNames;
	List<ConditionAmountParameter> conditionAmountParameters;
	List<ConditionTitleParameter> conditionTitleParameters;
	List<ConditionDateParameter> conditionDateParameters;
	List<ConditionMatchingOption> conditionMatchingOptions;
}
