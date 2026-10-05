#include "torch_control.h"
#include <assert.h>
#include <stdio.h>

int main(void)
{
    struct torch_state state;
    torch_reset(&state);
    assert(!torch_output(&state, 500).power_enable);
    torch_event(&state, TORCH_TOGGLE);
    const unsigned expected[] = {150, 500, 1000};
    unsigned cases = 0;
    for (unsigned level = 0; level < 3; ++level) {
        for (unsigned colour = 0; colour < 3; ++colour) {
            for (unsigned mix = 0; mix <= 1000; ++mix) {
                struct torch_output o = torch_output(&state, mix);
                assert(o.power_enable);
                assert(o.warm_permille + o.cool_permille == expected[level]);
                assert(o.warm_permille + o.cool_permille <= 1000);
                if (state.colour == TORCH_WARM) assert(o.cool_permille == 0);
                if (state.colour == TORCH_COOL) assert(o.warm_permille == 0);
                ++cases;
            }
            torch_event(&state, TORCH_NEXT_COLOUR);
        }
        torch_event(&state, TORCH_NEXT_BRIGHTNESS);
    }
    torch_event(&state, TORCH_FAULT);
    for (unsigned event = 0; event < 3; ++event) {
        torch_event(&state, (enum torch_event)event);
        assert(!torch_output(&state, 500).power_enable);
    }
    torch_event(&state, TORCH_CLEAR_FAULT);
    assert(!torch_output(&state, 500).power_enable);
    torch_event(&state, TORCH_TOGGLE);
    assert(torch_output(&state, 500).power_enable);
    assert(!torch_output(&state, 1001).power_enable);
    state.brightness_index = 255;
    assert(!torch_output(&state, 500).power_enable);
    state.brightness_index = 0;
    state.colour = (enum torch_colour)-1;
    assert(!torch_output(&state, 500).power_enable);
    state.colour = (enum torch_colour)255;
    assert(!torch_output(&state, 500).power_enable);
    printf("PASS: %u brightness/colour/mix cases and fault/startup checks\n", cases);
    return 0;
}
