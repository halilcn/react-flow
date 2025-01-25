import { Button } from "@mui/material";
import "./index.scss";
import CreateTeamModal from "./CreateTeamModal";
import { useState } from "react";
import CreateMemberModal from "./CreateMemberModal";
import Flow from "./Flow";
import { useAppContext } from "../../context/AppContext";

const Home = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenCreateMemberModal, setIsOpenCreateMemberModal] = useState(false);

  const { teams } = useAppContext();
  const hasTeam = teams.length > 0;

  const handleOpenCreateTeamModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleCloseCreateTeamModal = () => {
    setIsOpenCreateModal(false);
  };

  const handleOpenCreateMemberModal = () => {
    setIsOpenCreateMemberModal(true);
  };

  const handleCloseCreateMemberModal = () => {
    setIsOpenCreateMemberModal(false);
  };

  return (
    <div className="home">
      <CreateTeamModal
        open={isOpenCreateModal}
        handleClose={handleCloseCreateTeamModal}
      />
      <CreateMemberModal
        open={isOpenCreateMemberModal}
        handleClose={handleCloseCreateMemberModal}
      />
      <div className="home__top">
        <Button onClick={handleOpenCreateMemberModal} disabled={!hasTeam}>
          CREATE MEMBER
        </Button>
        <Button onClick={handleOpenCreateTeamModal}>CREATE TEAM</Button>
      </div>
      <div className="home__content">
        <Flow />
      </div>
    </div>
  );
};

export default Home;
