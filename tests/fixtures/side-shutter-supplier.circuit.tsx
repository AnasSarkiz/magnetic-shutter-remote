import { TS24CA } from "../../imports/TS24CA/TS24CA";

// Exact unrotated supplier reference for four-terminal CPL registration.
export default function SideShutterSupplierReference() {
    return <board width={12} height={12} layers={2} routingDisabled>
        <TS24CA name="SW2" internallyConnectedPins={[[3,4]]}/>
    </board>;
}
