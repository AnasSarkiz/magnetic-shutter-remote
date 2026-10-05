import { SKRTLAE010 } from "../../imports/SKRTLAE010/SKRTLAE010";

// Unrotated exact supplier reference for five-terminal CPL registration.
export default function AlpsSupplierReference() {
	return (
		<board width={12} height={12} layers={2} routingDisabled>
			<SKRTLAE010 name="SW2" internallyConnectedPins={[[1,3],[4,5]]} />
		</board>
	);
}
