from django.db import models


class SoilData(models.Model):
    sender1_moisture = models.IntegerField()
    sender2_moisture = models.IntegerField()
    sender1_ph = models.FloatField(null=True)  # Добавляем поле для кислотности
    sender2_ph = models.FloatField(null=True)  # Добавляем второе поле для кислотности
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender1: {self.sender1_moisture}, Sender2: {self.sender2_moisture}, pH1: {self.sender1_ph}, pH2: {self.sender2_ph}"


class ESP32Log(models.Model):
    device_id = models.CharField(max_length=50)
    log_message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log from {self.device_id} at {self.timestamp}"
