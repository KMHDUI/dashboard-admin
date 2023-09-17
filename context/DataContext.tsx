import { Registration, User } from "@/types/types";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const State = {
  PARTICIPANTS: "Participants Data",
  REGISTRATION: "Registration Data",
  PAYMENT: "Payment Data",
  SUBMISSION: "Submission Data",
};

export interface DataContextState {
  setState: Dispatch<SetStateAction<string>>;
  state: string;
  users: User[];
  registrations: Registration[];
}

export const DataContext = createContext<DataContextState | null>(null);

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState(State.PARTICIPANTS);
  const [users, setUsers] = useState<User[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  async function getUserData() {
    const res = await axios.get(`${process.env.API_URL}/api/v1/user/all`);
    setUsers(res.data.data);
  }

  async function getResgitrationData() {
    const res = await axios.get(
      `${process.env.API_URL}/api/v1/competition/all`
    );
    setRegistrations(res.data.data);
  }

  useEffect(() => {
    getUserData();
    getResgitrationData();
  }, []);

  const dataContextValue: DataContextState = {
    users,
    state,
    setState,
    registrations,
  };

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};
