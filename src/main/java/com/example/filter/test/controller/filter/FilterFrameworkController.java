package com.example.filter.test.controller.filter;

import com.example.filter.test.model.filter.framework.FilterSettingsFramework;
import com.example.filter.test.service.FilterService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/filter-framework")
public class FilterFrameworkController {
	private final FilterService filterService;

	public FilterFrameworkController(FilterService filterService) {
		this.filterService = filterService;
	}

	@GetMapping() public @ResponseBody FilterSettingsFramework getFilterSettingsFramework() {
		return filterService.getFilterSettingsFramework();
	}
}
