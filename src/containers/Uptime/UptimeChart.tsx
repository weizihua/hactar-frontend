import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import React, {ReactElement} from "react";
import {ChartWrapper} from "../../components/ChartWrapper";
import {INodeUptime} from "../../@types/ReduxStates";
import {EmptyChartData} from "../../components/EmptyChartData/EmptyChartData";

type UptimeChartProps = {
    data: INodeUptime[];
    onMouseMove: (e: any) => void;
    interval: string;
};

export class UptimeChart extends ChartWrapper<UptimeChartProps> {
    public render(): ReactElement {
        const {data, onMouseMove, interval} = this.props;
        const formattedData = data.map(v => ({
            date: v.updatedAt,
            online: v.isWorking ? 1 : 0,
            offline: v.isWorking ? 0 : 1,
        }));

        if (formattedData.length === 0) {
            return <EmptyChartData />;
        }

        return (
            <ResponsiveContainer width="100%" height={100}>
                <BarChart data={formattedData} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <XAxis dataKey="date" tickFormatter={(v): string => super.formatAxisDateDisplay(v, interval)} />
                    <Tooltip content={(): null => null} cursor={false} />
                    <Bar dataKey="online" stackId="a" fill="#EECA1C" radius={[4, 4, 0, 0]} barSize={21} />
                    <Bar dataKey="offline" stackId="a" fill="#756B30" radius={[4, 4, 0, 0]} barSize={21} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
