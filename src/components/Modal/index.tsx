import { Modal as ModalMaterial, ModalProps } from "@mui/material";
import classNames from "classnames";

import "./index.scss";

interface IModalContentProps {
  children: React.ReactNode;
}

const ModalContent = ({ children }: IModalContentProps) => (
  <div className="modal-content">{children}</div>
);

const Modal = (props: ModalProps) => {
  const { children, className, ...otherProps } = props;

  const modalClassnames = classNames("modal", className);

  return (
    <ModalMaterial {...otherProps} className={modalClassnames}>
      <ModalContent>{children}</ModalContent>
    </ModalMaterial>
  );
};

export default Modal;
