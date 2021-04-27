create schema filter;
create user postgres;
alter schema filter owner to postgres;

-- condition_field_name

create table filter.condition_field_name
(
    id int PRIMARY KEY not null,
    name text not null
);

alter table filter.condition_field_name
    owner to postgres;

-- condition_amount_parameter

create table filter.condition_amount_parameter
(
    id int PRIMARY KEY not null,
    name text not null
);

alter table filter.condition_amount_parameter
    owner to postgres;

-- condition_title_parameter

create table filter.condition_title_parameter
(
    id int PRIMARY KEY not null,
    name text not null
);

alter table filter.condition_title_parameter
    owner to postgres;

-- condition_date_parameter

create table filter.condition_date_parameter
(
    id int PRIMARY KEY not null,
    name text not null
);

alter table filter.condition_date_parameter
    owner to postgres;

-- condition_matching_option

create table filter.condition_matching_option
(
    id int PRIMARY KEY not null,
    name text not null
);

alter table filter.condition_matching_option
    owner to postgres;

-- filter_settings

create table filter.filter_settings
(
    id int generated BY DEFAULT AS IDENTITY PRIMARY KEY not null,
    name text not null,
    matching_option_id int not null
);

alter table filter.filter_settings
    add constraint filter_settings_condition_matching_option_id_fk
        foreign key (matching_option_id) references filter.condition_matching_option (id);

alter table filter.filter_settings
    owner to postgres;

-- amount_condition

create table filter.amount_condition
(
    id int generated BY DEFAULT AS IDENTITY PRIMARY KEY not null,
    filter_settings_id int not null,
    parameter_id int not null,
    value int not null
);

alter table filter.amount_condition
    add constraint amount_condition_condition_amount_parameter_id_fk
        foreign key (parameter_id) references filter.condition_amount_parameter
            on delete cascade;

alter table filter.amount_condition
    add constraint amount_condition_filter_settings_id_fk
        foreign key (filter_settings_id) references filter.filter_settings
            on delete cascade;

alter table filter.amount_condition
    owner to postgres;

-- title_condition

create table filter.title_condition
(
    id int generated BY DEFAULT AS IDENTITY PRIMARY KEY not null,
    filter_settings_id int not null,
    parameter_id int not null,
    value text not null
);

alter table filter.title_condition
    add constraint title_condition_condition_title_parameter_id_fk
        foreign key (parameter_id) references filter.condition_title_parameter
            on delete cascade;

alter table filter.title_condition
    add constraint title_condition_filter_settings_id_fk
        foreign key (filter_settings_id) references filter.filter_settings
            on delete cascade;

alter table filter.title_condition
    owner to postgres;

-- date_condition

create table filter.date_condition
(
    id int generated BY DEFAULT AS IDENTITY PRIMARY KEY not null,
    filter_settings_id int not null,
    parameter_id int not null,
    value date not null
);

alter table filter.date_condition
    add constraint date_condition_condition_date_parameter_id_fk
        foreign key (parameter_id) references filter.condition_date_parameter
            on delete cascade;

alter table filter.date_condition
    add constraint date_condition_filter_settings_id_fk
        foreign key (filter_settings_id) references filter.filter_settings
            on delete cascade;

alter table filter.date_condition
    owner to postgres;