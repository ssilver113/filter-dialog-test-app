package com.example.filter.test.controller.filter;

import com.example.filter.test.model.filter.settings.FilterSettings;
import com.example.filter.test.service.FilterService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/filter-settings")
public class FilterSettingsController {
	private final FilterService filterService;

	public FilterSettingsController(FilterService filterService) {
		this.filterService = filterService;
	}

	@GetMapping("/{id}")
	public @ResponseBody FilterSettings getFilterSettingsById(
			@PathVariable("id") int id) {
		return filterService.getFilterSettingsById(id);
	}

	@PutMapping("/{id}")
	public @ResponseBody FilterSettings updateFilterSettings(
			@PathVariable("id") int id,
			@RequestBody FilterSettings filterSettings) throws Exception {
		return filterService.updateFilterSettings(id, filterSettings);
	}
}
