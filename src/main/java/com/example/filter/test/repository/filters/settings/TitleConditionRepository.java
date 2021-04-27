package com.example.filter.test.repository.filters.settings;

import com.example.filter.test.model.filter.settings.TitleCondition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitleConditionRepository extends CrudRepository<TitleCondition, Integer> {
	void deleteByFilterSettingsId(int filterSettingsId);
}