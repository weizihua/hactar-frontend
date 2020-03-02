import React, {ReactElement, Dispatch, SetStateAction, useState} from "react";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import classNames from "classnames";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {Clipboard} from "../../components/Clipboard/Clipboard";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {NodeVersion} from "../Dashboard/NodeVersion/NodeVersion";
import {formatBytes} from "../../app/utils";
import {showConfirmationDialog} from "../../app/ModalRenderer/ModalSlice";
import {Dropdown} from "../../components/Dropdown/Dropdown";

interface IGeneralInfoProps {
    setElementsHidden: Dispatch<SetStateAction<boolean>>;
    areElementsHidden: boolean;
    setSelectedNodeIndex: (index: number) => void;
    selectedNodeIndex: number;
}

export const GeneralInfo = ({
    setElementsHidden,
    areElementsHidden,
    setSelectedNodeIndex,
    selectedNodeIndex,
}: IGeneralInfoProps): ReactElement => {
    const dispatch = useDispatch();
    const node = useSelector((state: RootState) => state.node);
    const {nodeInfo, nodeList} = node;
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const onNodeHeaderClick = (): void => {
        setElementsHidden(!areElementsHidden);
    };

    const onNodeClick = (index: number): void => {
        setSelectedNodeIndex(index);
    };

    return (<>
        <div
            onClick={(): void => {
                setShowDropdown(false);
            }}
            className={classNames("dropdown-screen", {hidden: !showDropdown})}
        />
        <div className="container flex-column vertical-margin general-info">
            <NodeListContainer
                display={areElementsHidden}
                selectedNode={selectedNodeIndex}
                onNodeHeaderClick={onNodeHeaderClick}
                onNodeClick={onNodeClick}
            />

            <div className={classNames({hidden: areElementsHidden})}>
                <div className="row-spaced upper">
                    <NodeNameTitle
                        title={`Node ${nodeList[selectedNodeIndex] && nodeList[selectedNodeIndex].id}`}
                        onClick={onNodeHeaderClick}
                        arrowOpen={false}
                    />
                    <div className="node-options">
                        <i className="material-icons">notifications_none</i>
                        <i 
                        onClick={()=>{setShowDropdown(true)}}
                        className="material-icons">more_vert</i>
                        <Dropdown
                            showDropdown={showDropdown}
                            elements={[
                                {
                                    title: "Edit node",
                                    iconId: "edit",
                                    onElementClick: (): void => {
                                        dispatch(showConfirmationDialog({
                                            title: "Edit node",
                                            onConfirmation: ()=>{console.log("click")},
                                            confirmationButtonLabel: "SAVE",
                                            children: <div>TEST</div>
                                        }));
                                        setShowDropdown(false);
                                    } 
                                },
                                {
                                    title: "Remove node",
                                    iconId: "delete",
                                    onElementClick: (): void => {}
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className="general-info-stats lower">
                    <div className="stat">
                        <label>node version</label>
                        <NodeVersion
                            nodeVersion={nodeInfo && nodeInfo.version}
                            latestVersion={node.latestNodeVersion}
                        />
                    </div>

                    <div className="stat">
                        <label>node address</label>
                        <Clipboard copyText={(nodeInfo && nodeInfo.walletAddress) || ""} truncate={true} />
                    </div>

                    <div className="stat">
                        <label>miner power</label>
                        <p>{nodeInfo && formatBytes(nodeInfo.minerPower)}</p>
                    </div>

                    <div className="stat">
                        <label>total power</label>
                        <p>{nodeInfo && formatBytes(nodeInfo.totalPower)}</p>
                    </div>

                    <div className="stat">
                        <label>sector size</label>
                        <p>{nodeInfo && nodeInfo.sectorSize}</p>
                    </div>

                    <div className="stat">
                        <label>number of sectors</label>
                        <p>{nodeInfo && nodeInfo.numberOfSectors}</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
};
