
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "./adc-keyboard.c"


enum adc_keys {
    KEY_UP = 1,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_OK
};


void adc_keyboard_task(void *arg)
{
    adc_keyboard_config_t cfg = {
        .adc_channel = ADC_CHANNEL_7,
        .gpio_pin = GPIO_NUM_35,
        .log_topic = "MAIN_KEYBOARD"
    };

    setup_adc_keyboard(&cfg);

    void key_callback(int key) {
        ESP_LOGI("MAIN_KEYBOARD", "Key pressed inline: %d", key);
    }

    adc_key_range_t ranges[] = {
        {0, 100, KEY_LEFT},
        {101, 500, KEY_UP},
        {501, 1250, KEY_DOWN},
        {1251, 2000, KEY_RIGHT},
        {2001, 3200, KEY_OK},
    };

    ad_keyboard_event_listener_cycle(&cfg, ranges, sizeof(ranges)/sizeof(ranges[0]), key_callback);
}


void app_main(void)
{
    xTaskCreatePinnedToCore(adc_keyboard_task, "adc_keyboard_task", 2048, NULL, 5, NULL, 1);
}
