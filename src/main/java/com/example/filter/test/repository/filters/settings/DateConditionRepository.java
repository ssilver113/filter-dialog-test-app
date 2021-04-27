package com.example.filter.test.repository.filters.settings;

import com.example.filter.test.model.filter.settings.DateCondition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateConditionRepository extends CrudRepository<DateCondition, Integer> {
	void deleteByFilterSettingsId(int filterSettingsId);
}