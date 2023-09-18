"use client";

import { DataContextState, State, useDataContext } from "@/context/DataContext";
import { User } from "@/types/types";
import {
  Button,
  Image,
  ModalFooter,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import AppModal from "../Modal/AppModal";
import axios from "axios";
import { useEffect, useState } from "react";

const Participants = () => {
  const { users } = useDataContext() as DataContextState;
  const [filteredUser, setFilteredUser] = useState<User[]>(users);
  const [filter, setFilter] = useState<
    "all" | "not_verified" | "verified" | "blocked"
  >("all");

  useEffect(() => {
    const data = users.filter((user) => {
      if (filter === "not_verified") {
        return user.is_verified && !user.is_blocked;
      } else if (filter === "verified") {
        return !user.is_verified && !user.is_blocked;
      } else if (filter === "blocked") {
        return user.is_blocked;
      }

      return !user.is_blocked;
    });
    setFilteredUser(data);
  }, [users, filter]);

  const getStatistic = () => {
    const total = users.length;
    let isVerified = 0;
    for (const user of users) {
      if (user.is_verified) {
        isVerified += 1;
      }
    }
    return (
      <>
        <span className="text-black">{`${isVerified}/${total}`}</span> users is
        verified by system
      </>
    );
  };
  return (
    <div>
      <div className="text-black text-[1.9em] text-center">
        {State.PARTICIPANTS}
      </div>
      <div className="mb-8 text-bold text-center">{getStatistic()}</div>
      <Stack className="max-w-[300px] mb-8">
        <div className="flex flex-col gap-2 cursor-pointer text-black">
          <Select
            id="filter"
            size={"md"}
            variant={"filled"}
            colorScheme="facebook"
            onChange={(e) => {
              setFilter(
                e.currentTarget.value as
                  | "all"
                  | "not_verified"
                  | "verified"
                  | "blocked"
              );
            }}
          >
            <option value="all">All</option>
            <option value="not_verified">Verified</option>
            <option value="verified">Not Verified</option>
            <option value="blocked">Blocked</option>
          </Select>
        </div>
      </Stack>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <TableCaption>{State.PARTICIPANTS}</TableCaption>
          <Thead>
            <Tr>
              <Th className="text-center">Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>University</Th>
              <Th className="text-center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUser.map((user, id) => {
              return <TableRow key={id} user={user} />;
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th className="text-center">Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>University</Th>
              <Th className="text-center">Status</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

const TableRow = ({ user }: { user: User }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { getUserData, getResgitrationData } =
    useDataContext() as DataContextState;

  const verifyHandler = async (status: 0 | 1 | 2 | 3) => {
    try {
      await axios.post(`${process.env.API_URL}/api/v1/user/verify`, {
        id: user.id,
        status: status,
      });

      getUserData();
      getResgitrationData();
    } catch (error) {}
    onClose();
  };
  return (
    <>
      <Tr className="cursor-pointer" onClick={onOpen}>
        <Td className="text-center font-bold">
          #{user.id.toUpperCase().substring(0, 6)}
        </Td>
        <Td>{user.fullname}</Td>
        <Td>{user.email}</Td>
        <Td>{user.college}</Td>
        <Td className="text-center text-[0.8em] font-black font-bold">
          <div className="w-full flex justify-center">
            {user.is_blocked ? (
              <div className=" w-fit text-[#383838] p-2">Blocked</div>
            ) : user.is_verified ? (
              <div className=" w-fit text-[#198754] p-2">Verified</div>
            ) : (
              <div className="w-fit text-[#ED4337] p-2">Not Verified</div>
            )}
          </div>
        </Td>
      </Tr>
      <AppModal onClose={onClose} isOpen={isOpen} title="Partisipan Data">
        <div className="w-full p-2">
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>Full Id</Td>
                  <Td>{user.id.toUpperCase()}</Td>
                </Tr>
                <Tr>
                  <Td>Fullname</Td>
                  <Td>{user.fullname}</Td>
                </Tr>
                <Tr>
                  <Td>Nickname</Td>
                  <Td>{user.nickname}</Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>{user.email}</Td>
                </Tr>
                <Tr>
                  <Td>Phone</Td>
                  <Td>{user.phone}</Td>
                </Tr>
                <Tr>
                  <Td>College</Td>
                  <Td>{user.college}</Td>
                </Tr>
                {user.sn && (
                  <Tr>
                    <Td>NPM</Td>
                    <Td>{user.sn}</Td>
                  </Tr>
                )}
                {user.major && (
                  <Tr>
                    <Td>Major</Td>
                    <Td>{user.major}</Td>
                  </Tr>
                )}
                {user.batch && (
                  <Tr>
                    <Td>Batch</Td>
                    <Td>{user.batch}</Td>
                  </Tr>
                )}
                {user.bod && (
                  <Tr>
                    <Td>Date Of Birth</Td>
                    <Td>{user.bod}</Td>
                  </Tr>
                )}
                {user.snUrl && (
                  <Tr>
                    <Td className="items-start">NPM Image</Td>
                    <Td>
                      <a href={user.snUrl} target="_blank">
                        <Image alt={user.snUrl} src={user.snUrl} />
                      </a>
                    </Td>
                  </Tr>
                )}
                {user.haloBelanjaUrl && (
                  <Tr>
                    <Td>Halo Belanja Image</Td>
                    <Td>
                      <a href={user.haloBelanjaUrl} target="_blank">
                        <Image
                          alt={user.haloBelanjaUrl}
                          src={user.haloBelanjaUrl}
                        />
                      </a>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <ModalFooter>
          <Stack direction="row" spacing={4} align="center">
            {!user.is_verified &&
              !user.is_blocked &&
              (user.snUrl || user.haloBelanjaUrl) && (
                <Button
                  colorScheme="facebook"
                  variant="outline"
                  onClick={() => {
                    verifyHandler(1);
                  }}
                  disabled={true}
                >
                  Verify
                </Button>
              )}
            {user.is_verified &&
              !user.is_blocked &&
              (user.snUrl || user.haloBelanjaUrl) && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={() => {
                    verifyHandler(0);
                  }}
                  disabled={true}
                >
                  Undo Verification
                </Button>
              )}
            {user.is_blocked && (
              <Button
                colorScheme="whatsapp"
                variant="outline"
                onClick={() => {
                  verifyHandler(3);
                }}
                disabled={true}
              >
                Unblock
              </Button>
            )}
            {!user.is_blocked && (
              <Button
                colorScheme="orange"
                variant="outline"
                onClick={() => {
                  verifyHandler(2);
                }}
                disabled={true}
              >
                Block
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </ModalFooter>
      </AppModal>
    </>
  );
};

export default Participants;
