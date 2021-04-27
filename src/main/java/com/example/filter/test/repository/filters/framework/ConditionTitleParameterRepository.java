package com.example.filter.test.repository.filters.framework;

import com.example.filter.test.model.filter.framework.ConditionTitleParameter;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionTitleParameterRepository extends CrudRepository<ConditionTitleParameter, Integer> {
	@NonNull
	List<ConditionTitleParameter> findAllByOrderByIdAsc();
}
