import { useAppContext } from "../../../../../context/AppContext";
import { HideTeamsIdsType, INodeContextDetail } from "../..";
import "./index.scss";

interface IContextMenuProps extends INodeContextDetail {
  hideTeamIds: HideTeamsIdsType;
  setHideTeamIds: (func: (prev: HideTeamsIdsType) => HideTeamsIdsType) => void;
  handleClearNodeContextDetail: () => void;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  hideTeamIds,
  setHideTeamIds,
  handleClearNodeContextDetail,
}: IContextMenuProps) {
  const { teams, handleRemoveMember } = useAppContext();

  const isTeamNode = !!teams.find((team) => team.id === id);

  const deleteMember = () => {
    handleRemoveMember(id);
    handleClearNodeContextDetail();
  };

  const renderTeamNodeActions = () => {
    const isHided = hideTeamIds.includes(id);

    const handleHideTeam = () => {
      setHideTeamIds((prev) => [...prev, id]);
      handleClearNodeContextDetail();
    };

    const handleShowTeam = () => {
      setHideTeamIds((prev) => prev.filter((hideTimeId) => hideTimeId !== id));
      handleClearNodeContextDetail();
    };

    return isHided ? (
      <button onClick={handleShowTeam}>show</button>
    ) : (
      <button onClick={handleHideTeam}>hide</button>
    );
  };

  const renderMemberNodeActions = () => (
    <button onClick={deleteMember}>remove</button>
  );

  return (
    <div
      style={{
        ...(top && { top }),
        ...(left && { left }),
        ...(right && { right }),
        ...(bottom && { bottom }),
      }}
      className="context-menu"
    >
      {isTeamNode ? renderTeamNodeActions() : renderMemberNodeActions()}
    </div>
  );
}
