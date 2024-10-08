from django.db import models


class SoilData(models.Model):
    sender1_moisture = models.IntegerField()
    sender2_moisture = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender1: {self.sender1_moisture}, Sender2: {self.sender2_moisture}"


class ESP32Log(models.Model):
    device_id = models.CharField(max_length=50)
    log_message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log from {self.device_id} at {self.timestamp}"
