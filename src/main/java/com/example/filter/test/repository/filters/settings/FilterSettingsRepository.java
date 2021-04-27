package com.example.filter.test.repository.filters.settings;

import com.example.filter.test.model.filter.settings.FilterSettings;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilterSettingsRepository extends CrudRepository<FilterSettings, Integer> {
	@NonNull
	Optional<FilterSettings> findById(int id);
}