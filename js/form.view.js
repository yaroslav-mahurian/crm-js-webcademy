const formViewController = (function () {

    const formDOMStrings = {
        requestForm: "#requestForm",
        formName: "#formName",
        formPhone: "#formPhone",
        formEmail: "#formEmail",
        formProduct: '#productSelect',
    };

    function getFormInput() {
        const options =  document.querySelector(formDOMStrings.formProduct).options;
        return {
            name: document.querySelector(formDOMStrings.formName),
            phone: document.querySelector(formDOMStrings.formPhone),
            email: document.querySelector(formDOMStrings.formEmail),
            product:  {   
                name: options[options.selectedIndex].text,
                value: options[options.selectedIndex].value
            }
        };
    }

    
    return {
        getFormInput: getFormInput,
        getFormDOMStrings: function () {
            return formDOMStrings;
        }
    };


})();