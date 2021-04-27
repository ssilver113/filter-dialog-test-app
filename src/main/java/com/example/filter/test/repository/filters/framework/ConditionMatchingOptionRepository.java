package com.example.filter.test.repository.filters.framework;

import com.example.filter.test.model.filter.framework.ConditionMatchingOption;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionMatchingOptionRepository extends CrudRepository<ConditionMatchingOption, Integer> {
	@NonNull
	List<ConditionMatchingOption> findAllByOrderByIdAsc();
}