"use client";

import { DataContextState, State, useDataContext } from "@/context/DataContext";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/react";
import React from "react";

const AppDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { setState } = useDataContext() as DataContextState;
  const subMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setState(e.currentTarget.id);
    onClose();
  };
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xs"} placement="left">
      <DrawerContent className="absolute !top-[78px]">
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody ml={4}>
          <ul className="flex flex-col gap-4 font-bold">
            <List id={State.PARTICIPANTS} onClick={subMenuClick}>
              Participant
            </List>
            <List id={State.REGISTRATION} onClick={subMenuClick}>
              Registration
            </List>
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const List = ({
  onClick,
  id,
  children,
}: {
  id?: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children: React.ReactNode;
}) => {
  return (
    <li id={id} key={id} className="cursor-pointer" onClick={onClick}>
      {" "}
      <div>{children}</div>
    </li>
  );
};

export default AppDrawer;
