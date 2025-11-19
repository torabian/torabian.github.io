#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "driver/adc.h"


#define KEY_NONE 0

// --- Config struct ---
typedef struct {
    int adc_channel;
    int gpio_pin;
    adc_bits_width_t bitwidth;
    adc_atten_t atten;
    int adc_unit;
    uint32_t default_vref;
    int wait_cycles_long_press;
    int long_press_emit_wait;
    int sample_count;
    const char* log_topic;
    
} adc_keyboard_config_t;

// --- Key range struct ---
typedef struct {
    int min_mv;
    int max_mv;
    int key;
} adc_key_range_t;

// --- Callback type ---
typedef void (*key_event_cb_t)(int key);



// Default configuration
static const adc_keyboard_config_t default_adc_keyboard_cfg = {
    .bitwidth = ADC_BITWIDTH_12,
    .atten = ADC_ATTEN_DB_11,
    .default_vref = 1100,
    .adc_unit = ADC_UNIT_1,
    .wait_cycles_long_press = 35,
    .long_press_emit_wait = 200,
    .sample_count = 10,
    .log_topic = "ADC_KEYBOARD"
};

// Merge user config with defaults
void merge_adc_keyboard_config(adc_keyboard_config_t* cfg) {
    if (cfg->bitwidth == 0) cfg->bitwidth = default_adc_keyboard_cfg.bitwidth;
    if (cfg->atten == 0) cfg->atten = default_adc_keyboard_cfg.atten;
    if (cfg->default_vref == 0) cfg->default_vref = default_adc_keyboard_cfg.default_vref;
    if (cfg->wait_cycles_long_press == 0) cfg->wait_cycles_long_press = default_adc_keyboard_cfg.wait_cycles_long_press;
    if (cfg->long_press_emit_wait == 0) cfg->long_press_emit_wait = default_adc_keyboard_cfg.long_press_emit_wait;
    if (cfg->sample_count == 0) cfg->sample_count = default_adc_keyboard_cfg.sample_count;
    if (cfg->log_topic == NULL) cfg->log_topic = default_adc_keyboard_cfg.log_topic;
}

// --- Detect key from voltage using ranges ---
int detect_key(int mv, const adc_key_range_t* ranges, int ranges_count) {
    for (int i = 0; i < ranges_count; i++) {
        if (mv >= ranges[i].min_mv && mv <= ranges[i].max_mv) {
            return ranges[i].key;
        }
    }
    return KEY_NONE;
}

// --- Capture current pressed key ---
int capture_current_pressed(const adc_keyboard_config_t* cfg, const adc_key_range_t* ranges, int ranges_count) {
    int sum = 0;
    for (int i = 0; i < cfg->sample_count; i++) {
        sum += adc1_get_raw(cfg->adc_channel);
    }
    int avg_raw = sum / cfg->sample_count;
    return detect_key(avg_raw, ranges, ranges_count);
}

// --- Setup GPIO and ADC ---
void setup_adc_keyboard(const adc_keyboard_config_t* cfg) {

    merge_adc_keyboard_config(cfg);

    gpio_set_direction(cfg->gpio_pin, GPIO_MODE_DISABLE);
    gpio_set_pull_mode(cfg->gpio_pin, GPIO_FLOATING);

    adc1_config_width(cfg->bitwidth);
    adc1_config_channel_atten(cfg->adc_channel, cfg->atten);

    vTaskDelay(pdMS_TO_TICKS(500));
}

// --- Main listener loop ---
void ad_keyboard_event_listener_cycle(
    const adc_keyboard_config_t* cfg,
    const adc_key_range_t* ranges,
    int ranges_count,
    key_event_cb_t callback
) {
    int last_key = KEY_NONE;
    int kept_same_key_cycles = 0;

    ESP_LOGI(cfg->log_topic, "Starting ADC keyboard listener");

    while (1) {
        int current_key = capture_current_pressed(cfg, ranges, ranges_count);

        // --- Same key held ---
        if (last_key == current_key) {
            if (current_key != KEY_NONE) {
                if (kept_same_key_cycles > cfg->wait_cycles_long_press) {
                    ESP_LOGI(cfg->log_topic, "[Long press] Key %d", current_key);
                    callback(current_key);
                    vTaskDelay(pdMS_TO_TICKS(cfg->long_press_emit_wait));

                }

                kept_same_key_cycles++;
            } else {
                kept_same_key_cycles = 0;
            }
        } 
        // --- Key state changed ---
        else {
            kept_same_key_cycles = 0;
            if (current_key == KEY_NONE) {
                ESP_LOGI(cfg->log_topic, "Key released");
            } else if (last_key == KEY_NONE) {
                ESP_LOGI(cfg->log_topic, "[Press] Key %d", current_key);
                callback(current_key);
            }
        }

        last_key = current_key;
        vTaskDelay(pdMS_TO_TICKS(30));
    }
}
