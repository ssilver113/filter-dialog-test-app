package com.example.filter.test.model.filter.settings;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "filter_settings", schema="filter")
public class FilterSettings {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name")
	private String name;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "filterSettingsId", cascade = {PERSIST, MERGE})
	@Fetch(FetchMode.SELECT)
	private List<AmountCondition> amountConditions;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "filterSettingsId", cascade = {PERSIST, MERGE})
	@Fetch(FetchMode.SELECT)
	private List<TitleCondition> titleConditions;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "filterSettingsId", cascade = {PERSIST, MERGE})
	@Fetch(FetchMode.SELECT)
	private List<DateCondition> dateConditions;

	@Column(name = "matching_option_id")
	private int matchingOptionId;
}
