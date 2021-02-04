let generateTestData = (function () {
    const ExampleItem = function (name, phone, email, product) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
    };

    var testData = [
        new ExampleItem("Петр Колкин", "+380872578465", "kolkinpetr@gmail.com", "course-html"),
        new ExampleItem("Екатерина Савченко", "+380965482214", "savchenko@gmail.com", "course-vue"),
        new ExampleItem("Алексей Савин", "+380547554488", "alekseisavin@gmail.com", "course-js"),
        new ExampleItem("Сергей Волков", "+380965874241", "sergei@gmail.com", "course-wordpress"),
        new ExampleItem(
            "Анастасия Белоусова",
            "+380962584747",
            "anastasiiabel@gmail.com",
            "course-php"
        ),
        new ExampleItem(
            "Александр Светлаков",
            "+380985557841",
            "alexandrsvetlakov@gmail.com",
            "course-vue"
        ),
        new ExampleItem("Алина Трофимова", "+380932145357", "alinatrofimova@gmail.com", "course-js"),
        new ExampleItem("Руслан Лапин", "+380951478526", "ruslanlapin@gmail.com", "course-html"),
        new ExampleItem(
            "Дарья Калинина",
            "+380952135478",
            "dariiakalinina@gmail.com",
            "course-wordpress"
        ),
    ];

    function randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function insertInUi() {
        let random = randomInt(testData.length);
        let randomItem = testData[random];
        document.querySelector("#formName").value = randomItem.name;
        document.querySelector("#formPhone").value = randomItem.phone;
        document.querySelector("#formEmail").value = randomItem.email;
        document.querySelector("#productSelect").value = randomItem.product;
    }

    return {
        init: insertInUi,
    };
})();

generateTestData.init();