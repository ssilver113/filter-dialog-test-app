package com.example.filter.test.repository.filters.framework;

import com.example.filter.test.model.filter.framework.ConditionFieldName;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionFieldNameRepository extends CrudRepository<ConditionFieldName, Integer> {
	@NonNull
	List<ConditionFieldName> findAllByOrderByIdAsc();
}