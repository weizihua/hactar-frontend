import React, {ReactElement, useEffect, useState} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {UptimeChart} from "./UptimeChart";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getUptime} from "./UptimeSlice";

export const Uptime = (): ReactElement => {
    const uptime = useSelector((state: RootState) => state.node.uptime);
    const [toolTip, setToolTip] = useState({isWorking: true, updatedAt: new Date().toString()});
    const [selectedInterval, setSelectedInterval] = useState<string>("week");
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    const dispatch = useDispatch();

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(uptime.data[e.activeTooltipIndex]);
        }
    };

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getUptime(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId, dispatch]);

    return (
        <div className="container flex-column">
            <div className="upper">
                <label>uptime</label>
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={(e): void => setSelectedInterval(e)}
                date={toolTip.updatedAt}
                values={[
                    {
                        icon: <img src={require("../../assets/icons/polygon.svg")} alt="Polygon" />,
                        value: toolTip.isWorking ? "Online" : "Offline",
                    },
                ]}
            />

            <UptimeChart data={uptime.data} onMouseMove={updateTooltip} />
        </div>
    );
};
