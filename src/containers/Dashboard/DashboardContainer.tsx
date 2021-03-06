import React, {ReactElement, useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import classNames from "classnames";
import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {MiningRewardsContainer} from "../MiningRewards/MiningRewardsContainer";
import {Uptime} from "../Uptime/UptimeContainer";
import {DiskSpace} from "../DiskSpace/DiskSpaceContainer";
import {DealsContainer} from "../Deals/DealsContainer";
import {RootState} from "../../app/rootReducer";
import {logOutUser, getUserEmail} from "../Register/UserSlice";
import {getAvailableNodeVersion} from "../GeneralInfo/GeneralInfoSlice";
import {getAllNodes} from "../NodeList/NodeListSlice";
import {EmptyList} from "../../components/EmptyList/EmptyList";
import {Loading} from "../../components/Loading/Loading";
import {Instructions} from "./Instructions/Instructions";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState<boolean>(true);
    const [fetchingNodeList, setFetchingNodeList] = useState<boolean>(false);
    const dispatch = useDispatch();
    const userEmail = useSelector((state: RootState) => state.user.email);
    const stateNodeList = useSelector((state: RootState) => state.nodeList);
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    // @ts-ignore
    const nodeList = stateNodeList.data;

    useEffect(() => {
        if (!fetchingNodeList) {
            setFetchingNodeList(true);
            dispatch(getUserEmail());
            dispatch(getAllNodes());
            dispatch(getAvailableNodeVersion());
            setElementsHidden(false);
        }
    }, [fetchingNodeList, selectedNodeId, dispatch]);

    if (stateNodeList.isLoading) {
        return <Loading />;
    }

    return (
        <div className="dashboard-container">
            <TopBar logOut={() => dispatch(logOutUser())} email={userEmail} />

            {!stateNodeList.isLoading && !selectedNodeId && stateNodeList.data.length === 0 ? (
                <>
                    <EmptyList message="No nodes are added" />
                    <Instructions />
                </>
            ) : (
                <>
                    <GeneralInfo setElementsHidden={setElementsHidden} areElementsHidden={areElementsHidden} />

                    {nodeList.length > 0 ? (
                        <>
                            <div className={classNames("splitted-row", {hidden: areElementsHidden})}>
                                <div className="column left">
                                    <CurrentBalanceContainer />
                                    <MiningRewardsContainer />
                                </div>
                                <div className="column right">
                                    <Uptime />
                                    <DiskSpace />
                                </div>
                            </div>

                            <div className={classNames("tables", {hidden: areElementsHidden})}>
                                <DealsContainer />
                            </div>
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
};
