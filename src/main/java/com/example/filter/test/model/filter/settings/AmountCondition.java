package com.example.filter.test.model.filter.settings;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "amount_condition", schema="filter")
public class AmountCondition {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "filter_settings_id")
	private int filterSettingsId;

	@Column(name = "parameter_id")
	private int parameterId;

	@Column(name = "value")
	private int value;
}
