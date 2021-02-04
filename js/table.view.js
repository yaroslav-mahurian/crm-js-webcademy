var tableViewController = (function () {
	const tableDOMStrings = {
		requestsTable: "#RequestsListTable",
		requestsTableRow: "#RequestsListTable tr",
		statusFilter: "#statusFilter",
		productFilter: "#productFilter",
		linkFilter: "#linkFilter"
	};

	function renderRequestList(requestsArray) {
		if (requestsArray) {
			document.querySelectorAll(tableDOMStrings.requestsTableRow).forEach(function(item) {
				item.remove();
			});

			requestsArray.forEach(function (item) {
				document.querySelector(tableDOMStrings.requestsTable).insertAdjacentHTML(
					"afterbegin",
					`<tr>
                <th scope="row">${item.id}</th>
                <td>${item.date}</td>
                <td>${item.product.name}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>
                    <div class="badge badge-pill badge-${item.status.color}">
                        ${item.status.text}
                    </div>
                </td>
                <td>
					<a href="03-crm-edit-bid.html?request-id=${item.id}">Редактировать</a>
                </td>
            </tr>`
				);
			});
		}
	}

	function displayCountBadges(countedStatusesObj) {
		for (let key in countedStatusesObj) {
			const badgeElement = document.createElement("div");
			badgeElement.classList.add("badge");
			badgeElement.innerText = countedStatusesObj[key];

			document.querySelector(`a[data-status=${key}]`).append(badgeElement);
		}
	}

	return {
		tableDOMStrings: tableDOMStrings,
		renderRequestList: renderRequestList,
		displayCountBadges: displayCountBadges,
	};
})();
