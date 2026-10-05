#include "torch_control.h"

void torch_reset(struct torch_state *state)
{
    *state = (struct torch_state){
        .enabled = false,
        .fault_latched = false,
        .brightness_index = 0,
        .colour = TORCH_NEUTRAL,
    };
}

void torch_event(struct torch_state *state, enum torch_event event)
{
    if (event == TORCH_FAULT) {
        state->enabled = false;
        state->fault_latched = true;
        return;
    }
    if (event == TORCH_CLEAR_FAULT) {
        state->fault_latched = false;
        state->enabled = false; /* Clearing a fault never turns light back on. */
        return;
    }
    if (state->fault_latched) {
        return;
    }
    switch (event) {
    case TORCH_TOGGLE:
        state->enabled = !state->enabled;
        break;
    case TORCH_NEXT_BRIGHTNESS:
        state->brightness_index = (state->brightness_index + 1) % 3;
        break;
    case TORCH_NEXT_COLOUR:
        state->colour = (enum torch_colour)((state->colour + 1) % 3);
        break;
    case TORCH_FAULT:
    case TORCH_CLEAR_FAULT:
        break;
    }
}

struct torch_output torch_output(const struct torch_state *state,
                                 uint16_t neutral_warm_permille)
{
    const uint16_t brightness[] = {150, 500, 1000};
    struct torch_output output = {0};
    if (!state->enabled || state->fault_latched || state->brightness_index > 2 ||
        state->colour < TORCH_WARM || state->colour > TORCH_COOL ||
        neutral_warm_permille > 1000) {
        return output;
    }
    uint16_t total = brightness[state->brightness_index];
    output.power_enable = true;
    if (state->colour == TORCH_WARM) {
        output.warm_permille = total;
    } else if (state->colour == TORCH_COOL) {
        output.cool_permille = total;
    } else {
        output.warm_permille = (uint32_t)total * neutral_warm_permille / 1000;
        output.cool_permille = total - output.warm_permille;
    }
    return output;
}
