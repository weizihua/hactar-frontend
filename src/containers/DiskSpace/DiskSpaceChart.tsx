import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {ReactElement} from "react";
import {EmptyList} from "../../components/EmptyList/EmptyList";
import {DiskSpaceDataProps} from "./DiskSpaceContainer";
import {ChartWrapper} from "../../components/ChartWrapper";

type DiskSpaceChartProps = {
    data: DiskSpaceDataProps[];
    onMouseMove: (e: any) => void;
};

export class DiskSpaceChart extends ChartWrapper<DiskSpaceChartProps> {
    public render(): ReactElement {
        const {data, onMouseMove} = this.props;
        console.log("data");
        console.log(data);
        if(data.length) return (
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <XAxis dataKey="date" tickFormatter={(v): string => super.formatXAxis(v)} />
                    <Tooltip content={(): null => null} cursor={false} />
                    <YAxis orientation="right" />
                    <CartesianGrid strokeDasharray="6 6" stroke="#363C4D" />

                    <Bar dataKey="free" stackId="a" fill="#EECA1C" radius={[4, 4, 0, 0]} barSize={49} />
                    <Bar dataKey="taken" stackId="a" fill="#756B30" radius={[4, 4, 0, 0]} barSize={49} />
                </BarChart>
            </ResponsiveContainer>
        );
        else return <EmptyList message="No data for selected interval" />
    }
}
