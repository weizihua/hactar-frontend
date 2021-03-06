import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {ReactElement} from "react";
import {ChartWrapper} from "../../components/ChartWrapper";
import {IMiningReward} from "../../@types/ReduxStates";
import {formatTokens} from "../../app/utils";
import {EmptyChartData} from "../../components/EmptyChartData/EmptyChartData";

type MiningRewardChartProps = {
    data: IMiningReward[];
    onMouseMove: (e: any) => void;
    interval: string;
};

export class MiningRewardsChart extends ChartWrapper<MiningRewardChartProps> {
    public render(): ReactElement {
        const {data, onMouseMove, interval} = this.props;
        const formattedData = data.map(v => ({date: v.timePeriod, amount: parseFloat(formatTokens(v.rewardSum))}));

        if (formattedData.length === 0) {
            return <EmptyChartData />;
        }

        return (
            <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={formattedData} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(238, 202, 28)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="rgba(238, 202, 28)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tickFormatter={(v): string => super.formatAxisDateDisplay(v, interval)} />
                    <YAxis orientation="right" />
                    <CartesianGrid strokeDasharray="6 6" stroke="#363C4D" />
                    <Tooltip content={(): null => null} />
                    <Area type="monotone" strokeWidth={2} dataKey="amount" stroke="#EECA1C" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
