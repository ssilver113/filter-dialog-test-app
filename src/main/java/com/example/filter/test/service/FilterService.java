package com.example.filter.test.service;

import com.example.filter.test.model.filter.framework.FilterSettingsFramework;
import com.example.filter.test.model.filter.settings.AmountCondition;
import com.example.filter.test.model.filter.settings.DateCondition;
import com.example.filter.test.model.filter.settings.FilterSettings;
import com.example.filter.test.model.filter.settings.TitleCondition;
import com.example.filter.test.repository.filters.framework.*;
import com.example.filter.test.repository.filters.settings.AmountConditionRepository;
import com.example.filter.test.repository.filters.settings.DateConditionRepository;
import com.example.filter.test.repository.filters.settings.FilterSettingsRepository;
import com.example.filter.test.repository.filters.settings.TitleConditionRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FilterService {
	private final ConditionFieldNameRepository conditionFieldNameRepository;
	private final ConditionAmountParameterRepository conditionAmountParameterRepository;
	private final ConditionDateParameterRepository conditionDateParameterRepository;
	private final ConditionTitleParameterRepository conditionTitleParameterRepository;
	private final ConditionMatchingOptionRepository conditionMatchingOptionRepository;
	private final FilterSettingsRepository filterSettingsRepository;
	private final AmountConditionRepository amountConditionRepository;
	private final TitleConditionRepository titleConditionRepository;
	private final DateConditionRepository dateConditionRepository;

	private FilterSettingsFramework filterSettingsFrameworkCache;

	public FilterService(ConditionFieldNameRepository conditionFieldNameRepository, ConditionAmountParameterRepository conditionAmountParameterRepository, ConditionDateParameterRepository conditionDateParameterRepository, ConditionTitleParameterRepository conditionTitleParameterRepository, ConditionMatchingOptionRepository conditionMatchingOptionRepository, FilterSettingsRepository filterSettingsRepository, AmountConditionRepository amountConditionRepository, TitleConditionRepository titleConditionRepository, DateConditionRepository dateConditionRepository) {
		this.conditionFieldNameRepository = conditionFieldNameRepository;
		this.conditionAmountParameterRepository = conditionAmountParameterRepository;
		this.conditionDateParameterRepository = conditionDateParameterRepository;
		this.conditionTitleParameterRepository = conditionTitleParameterRepository;
		this.conditionMatchingOptionRepository = conditionMatchingOptionRepository;
		this.filterSettingsRepository = filterSettingsRepository;
		this.amountConditionRepository = amountConditionRepository;
		this.titleConditionRepository = titleConditionRepository;
		this.dateConditionRepository = dateConditionRepository;
	}

	public FilterSettingsFramework getFilterSettingsFramework() {
		filterSettingsFrameworkCache = filterSettingsFrameworkCache != null
				? filterSettingsFrameworkCache
				: new FilterSettingsFramework(
						conditionFieldNameRepository.findAllByOrderByIdAsc(),
						conditionAmountParameterRepository.findAllByOrderByIdAsc(),
						conditionTitleParameterRepository.findAllByOrderByIdAsc(),
						conditionDateParameterRepository.findAllByOrderByIdAsc(),
						conditionMatchingOptionRepository.findAllByOrderByIdAsc());

		return filterSettingsFrameworkCache;
	}

	public FilterSettings getFilterSettingsById(int id) {
		return filterSettingsRepository.findById(id).orElse(null);
	}

	@Transactional
	public FilterSettings updateFilterSettings(int id, FilterSettings newFilterSettings) throws Exception {
		if (id != newFilterSettings.getId()) {
			throw new Exception("Filter settings ID mismatch!");
		}

		/* Here we can do additional validation for filter saving */

		/* Use setters so we don't nullify fields if they are missing from updated filter */
		FilterSettings filterSettingsToUpdate = getFilterSettingsById(id);
		if (!ObjectUtils.isEmpty(newFilterSettings.getName())) {
			filterSettingsToUpdate.setName(newFilterSettings.getName());
		}
		filterSettingsToUpdate.setMatchingOptionId(newFilterSettings.getMatchingOptionId());
		updateFilterConditions(newFilterSettings, filterSettingsToUpdate);

		return filterSettingsRepository.save(filterSettingsToUpdate);
	}

	private void updateFilterConditions(FilterSettings newFilterSettings, FilterSettings filterSettingsToUpdate) {
		saveNewAmountConditions(newFilterSettings, filterSettingsToUpdate);
		saveNewTitleConditions(newFilterSettings, filterSettingsToUpdate);
		saveNewDateConditions(newFilterSettings, filterSettingsToUpdate);
	}

	private void saveNewAmountConditions(FilterSettings newFilterSettings, FilterSettings filterSettingsToUpdate) {
		amountConditionRepository.deleteByFilterSettingsId(filterSettingsToUpdate.getId());
		List<AmountCondition> conditions = newFilterSettings.getAmountConditions();
		conditions.forEach(condition -> condition.setFilterSettingsId(newFilterSettings.getId()));
		filterSettingsToUpdate.setAmountConditions(conditions);
	}

	private void saveNewTitleConditions(FilterSettings newFilterSettings, FilterSettings filterSettingsToUpdate) {
		titleConditionRepository.deleteByFilterSettingsId(filterSettingsToUpdate.getId());
		List<TitleCondition> conditions = newFilterSettings.getTitleConditions();
		conditions.forEach(condition -> condition.setFilterSettingsId(newFilterSettings.getId()));
		filterSettingsToUpdate.setTitleConditions(conditions);
	}

	private void saveNewDateConditions(FilterSettings newFilterSettings, FilterSettings filterSettingsToUpdate) {
		dateConditionRepository.deleteByFilterSettingsId(filterSettingsToUpdate.getId());
		List<DateCondition> conditions = newFilterSettings.getDateConditions();
		conditions.forEach(condition -> condition.setFilterSettingsId(newFilterSettings.getId()));
		filterSettingsToUpdate.setDateConditions(conditions);
	}
}
