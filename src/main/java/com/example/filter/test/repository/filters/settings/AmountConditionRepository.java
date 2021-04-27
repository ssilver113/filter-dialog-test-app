package com.example.filter.test.repository.filters.settings;

import com.example.filter.test.model.filter.settings.AmountCondition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountConditionRepository extends CrudRepository<AmountCondition, Integer> {
	void deleteByFilterSettingsId(int filterSettingsId);
}