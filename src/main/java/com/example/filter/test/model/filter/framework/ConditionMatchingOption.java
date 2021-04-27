package com.example.filter.test.model.filter.framework;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "condition_matching_option", schema="filter")
@Getter
public class ConditionMatchingOption {
	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "name")
	private String name;
}
