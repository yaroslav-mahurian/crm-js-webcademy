const modelController = (function () {

    // Записываем элементы из полученные из localstorage в массив
    let allRequests = getAllRequests();
    const filter = JSON.parse(localStorage.getItem("filter")) || {
        product: "",
        status: ""
    };


    const Request = function (id, date, name, phone, email, product) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
        this.status = new Status("Новая", "new");
    };

    const Status = function (text, value) {
        this.text = text;
        this.value = value;
        this.color = "primary";
    };

    Status.prototype.setColor = function () {
        const Colors = {
            new: "primary",
            inWork: "warning",
            complete: "success",
            expectedPayment: "info",
            archive: "secondary",
            failure: "danger",
        };
        this.color = Colors[this.value];
    };


    function addNewRequest(name, phone, email, product) {
        // Генерируем ID
        let ID = 0;
        if (allRequests.length > 0) {
            let lastIndex = allRequests.length - 1;
            ID = allRequests[lastIndex].id + 1;
        }

        // Получаем дату и записываем её в заявку
        let now = new Date();
        const formatter = new Intl.DateTimeFormat("ru", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        let date = formatter.format(now);

        // Создаем новый обьект с заявкой и записываем в массив allRequests
        let newRequest = new Request(ID, date, name, phone, email, product, "new");
        allRequests.push(newRequest);

        // Сохраняем массив allRequests в localstorage
        let JSONRequestsList = JSON.stringify(allRequests);
        localStorage.setItem("allRequests", JSONRequestsList);

    }
    // Получаем все элементы из localstorage
    function getAllRequests() {
        let RequestsArr = JSON.parse(localStorage.getItem("allRequests")) || [];
        return RequestsArr;
    }

    // Удаление заявки в архив
    function deleteRequestToArchive(requestID) {
        const requestIndex = allRequests.findIndex(function(request){
            return request.id === requestID;
        });
        const requestForDelete = allRequests[requestIndex];
        const archiveStatus = new Status("Архив", "archive");
        archiveStatus.setColor();  

        requestForDelete.status.text = archiveStatus.text;
        requestForDelete.status.value = archiveStatus.value;
        requestForDelete.status.color = archiveStatus.color;

        localStorage.setItem("allRequests", JSON.stringify(allRequests));
    }

    let test = new Status("В работе", "inWork");
    console.log("modelController -> test", test);


    function countRequestsbyStatus() {
        const numberRequestbyStatus = {};
        let key = null;
        const statuses = [
            new Status("Новая", "new"),
            new Status("В работе", "inWork"),
            new Status("Завершена", "complete"),
            new Status("Архив", "archive")
        ];


        statuses.forEach(function (item) {
            switch (item.value) {
                case "new":
                    key = item.value;
                    numberRequestbyStatus[key] = getCountByStatus(item.value);
                    break;
                case "inWork":
                    key = item.value;
                    numberRequestbyStatus[key] = getCountByStatus(item.value);
                    break;
                case "complete":
                    key = item.value;
                    numberRequestbyStatus[key] = getCountByStatus(item.value);
                    break;
                default:
                    key = item.value;
                    numberRequestbyStatus[key] = getCountByStatus(item.value);
            }
        });
        return numberRequestbyStatus;
    }
    countRequestsbyStatus();

    // Подсчет заявок по статусам
    function getCountByStatus(status) {
        let count = 0;

        allRequests.forEach(function (item) {
            if (item.status.value === status) {
                count++;
            }
        });

        return count;
    }

    function getNewStatus(newStatusText, newStatusValue) {
        const newStatus = new Status(newStatusText, newStatusValue);
        newStatus.setColor();

        return newStatus;
    }

    return {
        allRequests: allRequests,
        filter: filter,
        addNewRequest: addNewRequest,
        getAllRequests: getAllRequests,
        countRequestsbyStatus: countRequestsbyStatus,
        deleteRequestToArchive: deleteRequestToArchive,
        getNewStatus: getNewStatus,
    };

})();