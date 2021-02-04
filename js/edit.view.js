const editViewController = (function () {
    const DOMStrings = {
        idElem: '[data-id]',
        dateElem: '[data-date]',
        allformFields: '[data-form-elem]',
        buttonSave: '[data-btn-save]',
        buttonDelete: '[data-btn-delete]',
        cardBody: '[data-card]',
    };

    // Отображение данных заявки для редактирования в форме
    function displayRequestData(requestData) {
        const idElem = document.querySelector(DOMStrings.idElem);
        const dateElem = document.querySelector(DOMStrings.dateElem);
        const [productList, name, email, phone, statusList] =  document.querySelectorAll(DOMStrings.allformFields);

        // Присваиваем значения для полей формы из requestData
        idElem.innerText = requestData.id;
        dateElem.innerText = requestData.date;
        productList.value = requestData.product.value;
        name.value = requestData.name;
        email.value = requestData.email;
        phone.value = requestData.phone;
        statusList.value = requestData.status.value;
    }

    // Получение данных из формы редактирования
    function getFormData() {
        const id = parseInt(document.querySelector(DOMStrings.idElem).innerText);
        const [productList, name, email, phone, statusList] = document.querySelectorAll(DOMStrings.allformFields);
        const productListOptions = productList.options;
        const statusListOptions = statusList.options;
    

        return {
            id,
            name: name.value,
            email: email.value,
            phone: phone.value,
            product: {
                name: productListOptions[productListOptions.selectedIndex].text,
                value: productListOptions[productListOptions.selectedIndex].value
            },
            status: {
                text: statusListOptions[statusListOptions.selectedIndex].text,
                value: statusListOptions[statusListOptions.selectedIndex].value
            }
        };
    }

    return {
        DOMStrings: DOMStrings,
        displayRequestData: displayRequestData,
        getFormData: getFormData
    };


})();