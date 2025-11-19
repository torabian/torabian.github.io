idf_component_register(SRCS "esp32-adc-keyboard.c"
                    INCLUDE_DIRS "."
                    REQUIRES driver esp_common esp_adc
                    )
