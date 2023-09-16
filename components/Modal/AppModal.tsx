import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const AppModal = ({
  onClose,
  isOpen,
  title,
  children,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Modal size="3xl" scrollBehavior="inside" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
