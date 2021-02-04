const formController = (function (modelCtrl, formUiCtrl, tableUiCtrl) {
    function setupFormEventListeners() {
        const DOM = formUiCtrl.getFormDOMStrings();
        document.querySelector(DOM.requestForm).addEventListener("submit", ctrlAddNewRequest);
    }
    // Получение данных из localstorage
    modelCtrl.getAllRequests();

    // Функция, которая выполняется при отправке формы
    function ctrlAddNewRequest(e) {
        e.preventDefault();
        const input = formUiCtrl.getFormInput();
        modelCtrl.addNewRequest(input.name.value, input.phone.value, input.email.value, input.product);
        generateTestData.init();
    }

    return {
        init: function () {
            setupFormEventListeners();
        },
    };
})(modelController, formViewController);

formController.init();