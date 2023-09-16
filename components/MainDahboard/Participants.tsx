"use client";

import { DataContextState, State, useDataContext } from "@/context/DataContext";
import { User } from "@/types/types";
import {
  Button,
  Image,
  ModalFooter,
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

const Participants = () => {
  const { users } = useDataContext() as DataContextState;
  return (
    <div>
      <div className="text-black text-[1.8em] text-center mb-8">
        {State.PARTICIPANTS}
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
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
            {users.map((user, id) => {
              return <TableRow key={id} user={user} />;
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
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

  const verifyHandler = async () => {
    try {
      await axios.post(`${process.env.API_URL}/api/v1/user/verify/accept`, {
        id: user.id,
      });
      user.is_verified = true;
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
        <Td className="text-center text-[0.8rem] font-bold">
          <div className="w-full flex justify-center">
            {user.is_verified ? (
              <div className=" w-fit rounded-md bg-[#198754] text-white p-2">
                Verified
              </div>
            ) : (
              <div className="w-fit rounded-md bg-[#ED4337] text-white p-2">
                Not Verified
              </div>
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
            <Button
              colorScheme="facebook"
              variant="outline"
              onClick={verifyHandler}
            >
              Verify
            </Button>
            <Button onClick={onClose}>Close</Button>
          </Stack>
        </ModalFooter>
      </AppModal>
    </>
  );
};

export default Participants;
