insert into filter.condition_field_name(id, name) values (1, 'Amount'), (2, 'Title'), (3, 'Date');
insert into filter.condition_amount_parameter(id, name) values (1, 'Lesser than'), (2, 'Greater than');
insert into filter.condition_title_parameter(id, name) values (1, 'Begins with'), (2, 'Ends with'), (3, 'Contains');
insert into filter.condition_date_parameter(id, name) values (1, 'Before'), (2, 'After');
insert into filter.condition_matching_option(id, name) values (1, 'meet all conditions'), (2, 'meet at least one condition'), (3, 'not meet any of the conditions');

insert into filter.filter_settings(name, matching_option_id) VALUES ('example filter 1', 1);
insert into filter.filter_settings(name, matching_option_id) VALUES ('example filter 2', 2);

insert into filter.amount_condition(filter_settings_id, parameter_id, value) VALUES (1, 1, 100);
insert into filter.amount_condition(filter_settings_id, parameter_id, value) VALUES (1, 2, 50);
insert into filter.title_condition(filter_settings_id, parameter_id, value) VALUES (1, 2, 'ends with this');
insert into filter.title_condition(filter_settings_id, parameter_id, value) VALUES (1, 3, 'contains this');
insert into filter.date_condition(filter_settings_id, parameter_id, value) VALUES (1, 1, '2020-01-01');

insert into filter.title_condition(filter_settings_id, parameter_id, value) VALUES (2, 1, 'starts with this');
insert into filter.date_condition(filter_settings_id, parameter_id, value) VALUES (2, 2, '2005-01-01');
