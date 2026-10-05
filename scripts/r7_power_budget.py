"""R7 feasibility calculations; assumptions are not measured efficiencies/runtime."""

from dataclasses import dataclass, asdict
import json


@dataclass(frozen=True)
class Budget:
    led_power_w: float
    minimum_loaded_supply_v: float = 3.3
    assumed_minimum_conversion_efficiency: float = 0.80
    radio_and_control_reserve_a: float = 0.020
    capacity_ah: float = 0.850
    nominal_battery_v: float = 3.7
    assumed_usable_energy_fraction: float = 0.65
    maximum_continuous_battery_a: float = 0.850

    def calculate(self):
        if not (0 < self.assumed_minimum_conversion_efficiency <= 1):
            raise ValueError("Efficiency must be in (0, 1]")
        if not (0 < self.assumed_usable_energy_fraction <= 1):
            raise ValueError("Usable energy fraction must be in (0, 1]")
        if min(self.led_power_w, self.minimum_loaded_supply_v,
               self.capacity_ah, self.nominal_battery_v) <= 0:
            raise ValueError("Power, voltage, and capacity must be positive")
        torch_a = self.led_power_w / self.assumed_minimum_conversion_efficiency / self.minimum_loaded_supply_v
        total_a = torch_a + self.radio_and_control_reserve_a
        usable_wh = self.capacity_ah * self.nominal_battery_v * self.assumed_usable_energy_fraction
        load_w = self.led_power_w / self.assumed_minimum_conversion_efficiency + self.nominal_battery_v * self.radio_and_control_reserve_a
        return {
            "inputs": asdict(self),
            "torch_input_a": torch_a,
            "total_battery_a": total_a,
            "continuous_current_margin_a": self.maximum_continuous_battery_a - total_a,
            "estimated_runtime_minutes": 60 * usable_wh / load_w,
            "runtime_status": "MODEL ONLY — POST-PROTOTYPE PHYSICAL VALIDATION",
        }


def tps2553_limits(resistor_kohm: float, tolerance: float = 0.01):
    """TI SLVS841F section 9.5.1, equation 1. R is in kOhm; results in mA."""
    if not 15 <= resistor_kohm * (1 - tolerance) <= resistor_kohm * (1 + tolerance) <= 232:
        raise ValueError("RILIM outside TI's recommended range")
    if not 0 <= tolerance < 1:
        raise ValueError("Invalid resistor tolerance")
    return {
        "minimum_ma": 25230 / (resistor_kohm * (1 + tolerance)) ** 1.016,
        "nominal_ma": 23950 / resistor_kohm ** 0.977,
        "maximum_ma": 22980 / (resistor_kohm * (1 - tolerance)) ** 0.94,
    }


if __name__ == "__main__":
    print(json.dumps({
        "revision": "R7 feasibility — components/layout not yet qualified",
        "date": "2026-10-04",
        "battery_candidate": "Jauch LP603443JU+PCM+2 WIRES 70MM / 246512 (850 mAh minimum, external, no C-number)",
        "scenarios": [Budget(p).calculate() for p in (1.5, 1.7, 2.0)],
        "current_limiter_candidate_35_7k_1pct": tps2553_limits(35.7),
        "gates": {
            "led_voltage_current_envelope": "OSRAM 2700/6500 K CRI90 pair selected; final driver/load setting pending",
            "loaded_supply_floor": "3.3 V DESIGN ASSUMPTION; NOT IMPLEMENTED OR VALIDATED",
            "efficiency": "0.80 ASSUMPTION; PROTOTYPE MEASUREMENT REQUIRED",
            "battery_harness_and_pack_envelope": "Jauch Rev1.1 maximum45x34.5x6.6 mm; red+/black-; final enclosure/harness fit pending",
            "thermal": "PENDING LED SELECTION AND ENCLOSURE ANALYSIS",
            "no_firmware_only_fault_protection": "HARDWARE CURRENT LIMIT REQUIRED",
        },
    }, indent=2))
