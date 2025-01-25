import { createContext, ReactNode, useContext, useState } from "react";
import { generateUniqueId } from "../utils";
import { ITeam, NewTeamType, ITeamMember } from "../types";

export type HandleAddTeamType = (team: NewTeamType) => void;
export type HandleAddMemberType = (
  member: ITeamMember,
  teamId: ITeam["id"]
) => void;
export type HandleRemoveMemberType = (memberId: ITeamMember["id"]) => void;

type AppContextType = {
  teams: ITeam[];
  handleAddTeam: HandleAddTeamType;
  handleAddMember: HandleAddMemberType;
  handleRemoveMember: HandleRemoveMemberType;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [teams, setTeams] = useState<ITeam[]>([]);

  const handleAddTeam: HandleAddTeamType = (team) => {
    const newTeam = {
      ...team,
      id: generateUniqueId(),
      members: [],
    };

    setTeams((prev) => [...prev, newTeam]);
  };

  const handleAddMember: HandleAddMemberType = (member, teamId) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id == teamId
          ? { ...team, members: [...team.members, member] }
          : team
      )
    );
  };

  const handleRemoveMember: HandleRemoveMemberType = (memberId) => {
    setTeams((prev) =>
      prev.map((team) => ({
        ...team,
        members: team.members.filter((member) => member.id !== memberId),
      }))
    );
  };

  return (
    <AppContext.Provider
      value={{ teams, handleAddTeam, handleAddMember, handleRemoveMember }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
