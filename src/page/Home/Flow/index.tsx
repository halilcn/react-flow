import { useCallback, useEffect, useRef, useState } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppContext } from "../../../context/AppContext";
import ContextMenu from "./components/ContextMenu";
import { ITeam } from "../../../types";

import "./index.scss";

interface INode {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
}

interface IEdge {
  id: string;
  source: string;
  target: string;
}

export interface INodeContextDetail {
  id: string;
  top: number | false;
  left: number | false;
  right: number | false;
  bottom: number | false;
}

export type HideTeamsIdsType = ITeam["id"][];

const generateNodes = (
  teams: ITeam[],
  { hideTeamIds }: { hideTeamIds: ITeam["id"][] }
) => {
  const allNodes = teams.reduce<INode[]>((acc, team, teamIndex) => {
    const teamBaseYPosition = (teamIndex + 1) * 200;
    const memberCount = team.members.length;
    const memberSpacing = 200;

    const memberNodes = team.members.map((member, memberIndex) => {
      const offset = (memberCount - 1) / 2;

      return {
        id: member.id,
        data: { label: member.name },
        position: {
          x: (memberIndex - offset) * memberSpacing,
          y: teamBaseYPosition + 100,
        },
        hidden: hideTeamIds.includes(team.id),
      };
    });
    const teamNode = {
      id: team.id,
      data: { label: team.name },
      position: { x: 0, y: teamBaseYPosition },
    };

    return [...acc, ...[teamNode, ...memberNodes]];
  }, []);

  return allNodes;
};

const generateEdges = (teams: ITeam[]) => {
  const allEdges = teams
    .map((team) =>
      team.members.reduce<IEdge[]>(
        (accMembers, member) => [
          ...accMembers,
          { id: `${team.id}-${member.id}`, source: team.id, target: member.id },
        ],
        []
      )
    )
    .flat();

  return allEdges;
};

const Flow = () => {
  const [nodeContextDetail, setNodeContextDetail] = useState<
    INodeContextDetail | undefined
  >();
  const [hideTeamIds, setHideTeamIds] = useState<HideTeamsIdsType>([]); // To hide members of a team

  const { teams } = useAppContext();

  const [nodes, setNodes] = useNodesState(
    generateNodes(teams, { hideTeamIds })
  );
  const [edges, setEdges] = useEdgesState(generateEdges(teams));

  const ref = useRef<HTMLDivElement>(null);

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault();

      if (!ref?.current) return;

      const pane = ref.current.getBoundingClientRect();

      setNodeContextDetail({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 100,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setNodeContextDetail]
  );

  const handleClearNodeContextDetail = useCallback(
    () => setNodeContextDetail(undefined),
    [setNodeContextDetail]
  );

  useEffect(() => {
    setNodes(generateNodes(teams, { hideTeamIds }));
    setEdges(generateEdges(teams));
  }, [JSON.stringify(teams), JSON.stringify(hideTeamIds)]);

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      fitView
      onNodeContextMenu={onNodeContextMenu}
      onPaneClick={handleClearNodeContextDetail}
    >
      <MiniMap />
      <Controls />
      <Background />
      {nodeContextDetail && (
        <ContextMenu
          {...nodeContextDetail}
          setHideTeamIds={setHideTeamIds}
          hideTeamIds={hideTeamIds}
          handleClearNodeContextDetail={handleClearNodeContextDetail}
        />
      )}
    </ReactFlow>
  );
};

export default Flow;
