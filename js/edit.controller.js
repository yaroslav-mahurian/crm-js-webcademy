const editController = (function (modelCtrl, editUiCtrl, tableuiCtrl) {
    const buttonSave = document.querySelector(editUiCtrl.DOMStrings.buttonSave);
    const deleteButton = document.querySelector(editUiCtrl.DOMStrings.buttonDelete);
    const countRequestsByStatusObj = modelCtrl.countRequestsbyStatus();
    const editDataRequest = getRequestData();

    function setupEventListeners() {
        buttonSave.addEventListener("click", editRequest);

        deleteButton.addEventListener("click", function() {
            const requestID = parseInt(document.querySelector(editUiCtrl.DOMStrings.idElem).innerText);
            modelCtrl.deleteRequestToArchive(requestID);
        });

        editUiCtrl.displayRequestData(editDataRequest);
        tableuiCtrl.displayCountBadges(countRequestsByStatusObj);
    }

    function getRequestData() {
        const requestIDedit = parseInt(location.search.substr(1).split("=")[1]);
        const requestIndex = modelCtrl.allRequests.findIndex(function(item) {
            return item.id === requestIDedit;
        });
        return modelCtrl.allRequests[requestIndex];
    }

    function editRequest() {
        const requestData = editUiCtrl.getFormData();

        if (requestData) {
            const requestIndex = modelCtrl.allRequests.findIndex(function(item) {
                return item.id === requestData.id;
            });
            const requestForEdit = modelCtrl.allRequests[requestIndex];
            const newStatus = modelCtrl.getNewStatus(requestData.status.text, requestData.status.value);

            requestForEdit.date = createDateStr() + " (edit)";
            requestForEdit.name = requestData.name;
            requestForEdit.phone = requestData.phone;
            requestForEdit.email = requestData.email;
            requestForEdit.product.name = requestData.product.name;
            requestForEdit.product.value = requestData.product.value;
            requestForEdit.status.text = newStatus.text;
            requestForEdit.status.value = newStatus.value;
            requestForEdit.status.color = newStatus.color;

            localStorage.setItem("allRequests", JSON.stringify(modelCtrl.allRequests));

        }
    }

    function createDateStr() {
        let now = new Date();
        const formatter = new Intl.DateTimeFormat("ru", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        return formatter.format(now);
    }

    function init() {
        setupEventListeners();
    }

    return {
        init: init
    };


})(modelController, editViewController, tableViewController);

editController.init();

