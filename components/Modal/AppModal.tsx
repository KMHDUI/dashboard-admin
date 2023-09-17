import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
} from "@chakra-ui/react";
import React from "react";

const AppModal = ({
  onClose,
  isOpen,
  title,
  children,
  appSize,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  appSize?:
    | ResponsiveValue<
        | "3xl"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | (string & {})
        | "xs"
        | "4xl"
        | "5xl"
        | "6xl"
        | "full"
      >
    | undefined;
}) => {
  return (
    <Modal
      size={appSize ?? "3xl"}
      scrollBehavior="inside"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
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
