"use client";
import { DataContextState, State, useDataContext } from "@/context/DataContext";
import React from "react";
import Participants from "./Participants";
import Registraion from "./Registration";

const MainDashboard = () => {
  const { state } = useDataContext() as DataContextState;
  return (
    <Container>
      {state === State.PARTICIPANTS && <Participants />}
      {state === State.REGISTRATION && <Registraion />}
    </Container>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={`mt-[78px] pt-[30px] px-[24px] `}>{children}</div>;
};

export default MainDashboard;
