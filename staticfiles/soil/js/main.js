document.addEventListener("DOMContentLoaded", function() {
    console.log("main.js loaded");  // Отладочное сообщение, когда скрипт загружен

    const loader = document.getElementById("loader");
    const table = document.getElementById("data-table");
    loader.style.display = "block";
    table.style.display = "none";

    function fetchData() {
        console.log("Fetching data...");  // Отладочное сообщение перед началом запроса

        $.ajax({
            url: "/api/soil_data/",
            type: "GET",
            success: function(data) {
                console.log("Данные успешно получены:", data);  // Лог получения данных

                var tableBody = $("#data-table tbody");
                tableBody.empty();

                for (var i = 0; i < data.length; i++) {
                    console.log("Обработка строки данных:", data[i]);  // Лог для каждой строки данных

                    // Проверка значений влажности и pH
                    var sender1Moisture = data[i].sender1_moisture !== undefined ? data[i].sender1_moisture : "N/A";
                    var sender2Moisture = data[i].sender2_moisture !== undefined ? data[i].sender2_moisture : "N/A";
                    var sender1Ph = data[i].sender1_ph !== undefined ? data[i].sender1_ph : "N/A";  // Если pH отсутствует
                    var sender2Ph = data[i].sender2_ph !== undefined ? data[i].sender2_ph : "N/A";  // Если pH отсутствует

                    // Логи для каждого значения
                    console.log("Sender 1 Moisture:", sender1Moisture);
                    console.log("Sender 2 Moisture:", sender2Moisture);
                    console.log("Sender 1 pH:", sender1Ph);
                    console.log("Sender 2 pH:", sender2Ph);

                    // Создание строки таблицы
                    var row = "<tr class='fade-in'>" +
                        "<td title='Timestamp: " + data[i].timestamp + "'>" + data[i].timestamp + "</td>" +
                        "<td title='Sender 1 Moisture: " + sender1Moisture + "'>" + sender1Moisture + "</td>" +
                        "<td title='Sender 2 Moisture: " + sender2Moisture + "'>" + sender2Moisture + "</td>" +
                        "<td title='Sender 1 pH: " + sender1Ph + "'>" + sender1Ph + "</td>" +
                        "<td title='Sender 2 pH: " + sender2Ph + "'>" + sender2Ph + "</td>" +
                        "</tr>";

                    tableBody.append(row);  // Добавление строки в таблицу
                    console.log("Строка данных добавлена в таблицу.");  // Лог успешного добавления строки
                }

                loader.style.display = "none";  // Скрыть лоадер
                table.style.display = "table";  // Показать таблицу
                gsap.fromTo(table, { opacity: 0 }, { opacity: 1, duration: 1 });
                console.log("Таблица отображена.");  // Лог завершения отображения
            },
            error: function(jqXHR, textStatus, errorThrown) {
                loader.style.display = "none";  // Скрыть лоадер в случае ошибки
                alert("Failed to fetch data. Please try again later.");
                console.error("Ошибка запроса:", textStatus, errorThrown);  // Лог ошибки запроса
            }
        });
    }

    // Изначальная загрузка данных
    fetchData();

    // Периодическое обновление данных каждые 5 секунд
    setInterval(fetchData, 5000);

    // Плавная прокрутка к таблице данных при загрузке страницы
    $('html, body').animate({
        scrollTop: $(".table-container").offset().top
    }, 1000);
    console.log("Анимация прокрутки к таблице завершена.");  // Лог завершения анимации
});
