#ifndef TORCH_CONTROL_H
#define TORCH_CONTROL_H

#include <stdbool.h>
#include <stdint.h>

enum torch_colour { TORCH_WARM, TORCH_NEUTRAL, TORCH_COOL };
enum torch_event {
    TORCH_TOGGLE,
    TORCH_NEXT_BRIGHTNESS,
    TORCH_NEXT_COLOUR,
    TORCH_FAULT,
    TORCH_CLEAR_FAULT,
};

struct torch_state {
    bool enabled;
    bool fault_latched;
    uint8_t brightness_index;
    enum torch_colour colour;
};

struct torch_output {
    bool power_enable;
    uint16_t warm_permille;
    uint16_t cool_permille;
};

void torch_reset(struct torch_state *state);
void torch_event(struct torch_state *state, enum torch_event event);
/* Mix is a calibrated optical parameter. This module assigns no claimed CCT.
 * Full-scale current is set by the qualified hardware, not these percentages.
 * The hardware current limiter remains necessary if firmware/GPIOs fail. */
struct torch_output torch_output(const struct torch_state *state,
                                 uint16_t neutral_warm_permille);

#endif
