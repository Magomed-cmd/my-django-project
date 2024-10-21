document.addEventListener("DOMContentLoaded", function() {
    console.log("main.js loaded");  // Отладочное сообщение

    const loader = document.getElementById("loader");
    const table = document.getElementById("data-table");
    loader.style.display = "block";
    table.style.display = "none";

    function fetchData() {
        console.log("Fetching data...");  // Отладочное сообщение

        $.ajax({
            url: "/api/soil_data/",
            type: "GET",
            success: function(data) {
                console.log("Данные получены:", data);  // Отладочное сообщение

                var tableBody = $("#data-table tbody");
                tableBody.empty();

                for (var i = 0; i < data.length; i++) {
                    console.log("Отображение строки данных:", data[i]);  // Отладка каждой строки данных

                    var row = "<tr class='fade-in'>" +
                        "<td title='Timestamp: " + data[i].timestamp + "'>" + data[i].timestamp + "</td>" +
                        "<td title='Sender 1 Moisture: " + data[i].sender1_moisture + "'>" + data[i].sender1_moisture + "</td>" +
                        "<td title='Sender 2 Moisture: " + data[i].sender2_moisture + "'>" + data[i].sender2_moisture + "</td>" +
                        "<td title='Sender 1 pH: " + data[i].sender1_ph + "'>" + data[i].sender1_ph + "</td>" +  // Добавляем данные pH
                        "<td title='Sender 2 pH: " + data[i].sender2_ph + "'>" + data[i].sender2_ph + "</td>" +  // Добавляем данные pH
                        "</tr>";
                    tableBody.append(row);
                }
                loader.style.display = "none";
                table.style.display = "table";
                gsap.fromTo(table, { opacity: 0 }, { opacity: 1, duration: 1 });
            },
            error: function() {
                loader.style.display = "none";
                alert("Failed to fetch data. Please try again later.");
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
});
