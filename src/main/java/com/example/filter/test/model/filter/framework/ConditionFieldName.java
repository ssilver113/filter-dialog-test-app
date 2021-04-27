package com.example.filter.test.model.filter.framework;


import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "condition_field_name", schema="filter")
@Getter
public class ConditionFieldName {
	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "name")
	private String name;
}

