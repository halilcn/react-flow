import { Button, TextField } from "@mui/material";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

import "./index.scss";

interface ICreateTeamModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTeamModal = ({ open, handleClose }: ICreateTeamModalProps) => {
  const [name, setName] = useState("");

  const { handleAddTeam } = useAppContext();

  const isValid = name.trim() !== "";

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreateTeam = () => {
    handleAddTeam({ name });

    setName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="create-team-modal">
        <div className="create-team-modal__item">
          <TextField
            size="small"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="create-team-modal__item">
          <Button
            disabled={!isValid}
            variant="contained"
            onClick={handleCreateTeam}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
