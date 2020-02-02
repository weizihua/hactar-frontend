import React, {ReactElement, useState} from "react";

import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {BalanceHistoryContainer} from "../Balance/BalanceHistoryContainer";
import {Uptime} from "../Uptime/UptimeContainer";
import {DiskSpace} from "../DiskSpace/DiskSpaceContainer";
import classNames from "classnames";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState(false);

    return (
        <div className="dashboard-container">
            <TopBar />

            <GeneralInfo
                setElementsHidden={setElementsHidden}
                areElementsHidden={areElementsHidden}
            />

            <div className={classNames("splitted-row", {"hidden": areElementsHidden})}>
                <div className="column left">
                    <CurrentBalanceContainer />
                    <BalanceHistoryContainer />
                </div>
                <div className="column right">
                    <Uptime />
                    <DiskSpace />
                </div>
            </div>
        </div>
    );
};
