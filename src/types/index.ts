export interface ITeamMember {
    id: string;
    name: string;
}

export interface ITeam {
    id: string;
    name: string;
    members: ITeamMember[];
}

export type NewTeamType = Omit<ITeam, "id" | "members">;
