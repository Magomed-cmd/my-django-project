document.addEventListener("DOMContentLoaded", function() {
    // Показать анимацию загрузки
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    function fetchData() {
        $.ajax({
            url: "/api/soil_data/",
            type: "GET",
            success: function(data) {
                var tableBody = $("#data-table tbody");
                tableBody.empty();
                for (var i = 0; i < data.length; i++) {
                    var row = "<tr>" +
                        "<td>" + data[i].timestamp + "</td>" +
                        "<td>" + data[i].sender1_moisture + "</td>" +
                        "<td>" + data[i].sender2_moisture + "</td>" +
                        "</tr>";
                    tableBody.append(row);
                }
                // Скрыть анимацию загрузки после загрузки данных
                loader.style.display = "none";
            }
        });
    }

    // Изначальная загрузка данных
    fetchData();

    // Периодическое обновление данных каждые 5 секунд
    setInterval(fetchData, 5000);
});
