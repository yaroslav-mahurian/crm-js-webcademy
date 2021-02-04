const tableController = (function (modelCtrl, tableUiCtrl) {

	const filterInfo = modelCtrl.filter;
	const statusFilter = document.querySelector(tableUiCtrl.tableDOMStrings.statusFilter);
	const productFilter = document.querySelector(tableUiCtrl.tableDOMStrings.productFilter);
	const linkFilter = document.querySelector(tableUiCtrl.tableDOMStrings.linkFilter);
	
	
	// Записываем в переменную обьект с подсчитанными статусами
	const countedRequestStatuses = modelCtrl.countRequestsbyStatus();


	function setupEventListeners () {
		// Отображаем на странице полученный массив заявок из Localstorage
		tableUiCtrl.renderRequestList(modelCtrl.getAllRequests());

		// Вызываем функцию для отображения подсчитанных статусов в разметке
		tableUiCtrl.displayCountBadges(countedRequestStatuses);

		linkFilter.addEventListener("click", function(e) {
			filterInfo.status = e.target.dataset.status;
			showFilteredElements(modelCtrl.allRequests, filterInfo);
			setActiveItems();
			saveFilter();
		});

		statusFilter.addEventListener("click", function(e) {
			filterInfo.status = e.target.dataset.status;
			showFilteredElements(modelCtrl.allRequests, filterInfo);
			setActiveItems();
			saveFilter();
		});

		productFilter.addEventListener("change", function(e) {
			filterInfo.product = e.target.value;
			showFilteredElements(modelCtrl.allRequests, filterInfo);
			setActiveItems();
			saveFilter();
		});

		activeFilterElements();
	}



	function saveFilter() {
		localStorage.setItem("filter", JSON.stringify(filterInfo));
	}

	function activeFilterElements () {
		showFilteredElements(modelCtrl.allRequests, filterInfo);
		setActiveItems();
	}

	function filterData(filterData, filterObject) {
		if (filterObject.status && filterObject.status !== "all") {
			filterData = filterData.filter(function(item) {
				return item.status.value === filterObject.status;
			});
		}
		if (filterObject.product && filterObject.product !== "all") {
			filterData = filterData.filter(function(item) {
				return item.product.value === filterObject.product;
			});
		}

		return filterData;
	}

	function showFilteredElements(filterRequests, filter) {
		const filteredData = filterData(filterRequests, filter);		
		tableUiCtrl.renderRequestList(filteredData);
	}

	function setActiveItems() {
		const filter = modelCtrl.filter;

		if (filter.status) {
			const filterElements = document.querySelectorAll(`[data-status="${filter.status}"]`);
			const activeElements = document.querySelectorAll(".active");

			if (filterElements) {
				if (activeElements) {
					activeElements.forEach(function(item) {
						item.classList.remove("active");
					});
				}
				filterElements.forEach(function(item) {
					item.classList.add("active");
				});
			}
		}

		if (filter.product) {
			const optionElement = document.querySelector(`option[value="${filter.product}"]`);			
			const selectedElements = document.querySelectorAll('option[selected="true"]');

			if (selectedElements) {
				selectedElements.forEach(function(item) {
					item.removeAttribute("selected");
				});
			}
			optionElement.setAttribute("selected", "true");
		}


	}

	function init() {
		setupEventListeners();
	}

	return {
		init: init
	};

})(modelController, tableViewController);

tableController.init();
