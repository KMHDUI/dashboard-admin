"use client";

import { DataContextState, State, useDataContext } from "@/context/DataContext";
import { Registration, User } from "@/types/types";
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

const Registraion = () => {
  const { registrations } = useDataContext() as DataContextState;
  const [filteredRegistrations, setFilteredRegistrations] =
    useState<Registration[]>(registrations);
  const [filter, setFilter] = useState<
    "all" | "Futsal" | "Story Telling" | "Essay" | "Photography"
  >("all");

  useEffect(() => {
    const data = registrations.filter((registration) => {
      if (filter === "Futsal") {
        return registration.competition_name === "Futsal";
      } else if (filter === "Story Telling") {
        return registration.competition_name === "Story Telling";
      } else if (filter === "Essay") {
        return registration.competition_name === "Essay";
      } else if (filter === "Photography") {
        return registration.competition_name === "Photography";
      }

      return registration;
    });
    setFilteredRegistrations(data);
  }, [registrations, filter]);

  //   const getStatistic = () => {
  //     const total = registrations.length;
  //     for (const registration of registrations) {

  //     }
  //     return (
  //       <>
  //         <span className="text-black">{`${isVerified}/${total}`}</span> users is
  //         verified by system
  //       </>
  //     );
  //   };

  return (
    <div>
      <div className="text-black text-[1.9em] text-center">
        {State.REGISTRATION}
      </div>
      {/* <div className="mb-8 text-bold text-center">{getStatistic()}</div> */}
      <Stack className="max-w-[300px] mb-8">
        <div className="flex flex-col gap-2 cursor-pointer text-black">
          <Select
            id="filter"
            size={"md"}
            variant={"filled"}
            placeholder="Filter By"
            colorScheme="facebook"
            onChange={(e) => {
              setFilter(
                e.currentTarget.value as
                  | "all"
                  | "Futsal"
                  | "Story Telling"
                  | "Essay"
                  | "Photography"
              );
            }}
          >
            <option value="all">All</option>
            <option value="Futsal">Futsal</option>
            <option value="Story Telling">Story Telling</option>
            <option value="Essay">Essay</option>
            <option value="Photography">Photography</option>
          </Select>
        </div>
      </Stack>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <TableCaption>{State.REGISTRATION}</TableCaption>
          <Thead>
            <Tr>
              <Th className="text-center">Registration Id</Th>
              <Th>Competition Name</Th>
              <Th>User Fullname</Th>
              <Th>User Email</Th>
              <Th>User College</Th>
              <Th className="text-center">Submission</Th>
              <Th className="text-center">Payment Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRegistrations.map((registration, id) => {
              return <TableRow key={id} registration={registration} />;
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th className="text-center">Registration Id</Th>
              <Th>Competition Name</Th>
              <Th>User Fullname</Th>
              <Th>User Email</Th>
              <Th>User College</Th>
              <Th className="text-center">Submission</Th>
              <Th className="text-center">Payment Status</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

const TableRow = ({ registration }: { registration: Registration }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <>
      <Tr className="cursor-pointer" onClick={onOpen}>
        <Td className="text-center font-bold">
          #{registration.id.toUpperCase().substring(0, 6)}
        </Td>
        <Td>{registration.competition_name}</Td>
        <Td>{registration.user_fullname}</Td>
        <Td>{registration.user_email}</Td>
        <Td>{registration.user_college}</Td>
        <Td className="text-center">
          {!registration.submission_status ? (
            "-"
          ) : registration.submission_status === "Submitted" ? (
            <a
              className="font-bold text-[#4F709C]"
              target="_blank"
              href={registration.url}
              onClick={onClose}
            >
              Link
            </a>
          ) : (
            "None"
          )}
        </Td>
        <Td className="text-center text-[0.8rem] font-bold">
          <div className="w-full flex justify-center">
            {registration.payment_status === "Accepted" ? (
              <div className=" w-fit rounded-md bg-[#198754] text-white p-2">
                {registration.payment_status}
              </div>
            ) : (
              <div className="w-fit rounded-md bg-[#ED4337] text-white p-2">
                {registration.payment_status}
              </div>
            )}
          </div>
        </Td>
      </Tr>
      <AppModal
        appSize={"full"}
        onClose={onClose}
        isOpen={isOpen}
        title="Partisipan Data"
      >
        <div className="w-full p-2">
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td>Registration Code</Td>
                  <Td>{registration.id}</Td>
                </Tr>
                <Tr>
                  <Td>Competition Name</Td>
                  <Td>{registration.competition_name}</Td>
                </Tr>
                <Tr>
                  <Td>Competition Type</Td>
                  <Td>{registration.competition_type}</Td>
                </Tr>
                <Tr>
                  <Td>Is Using Submission</Td>
                  <Td>
                    {registration.competition_using_submission
                      ? "True"
                      : "False"}
                  </Td>
                </Tr>
                <Tr>
                  <Td>User Fullname</Td>
                  <Td>{registration.user_fullname}</Td>
                </Tr>
                <Tr>
                  <Td>User Email</Td>
                  <Td>{registration.user_email}</Td>
                </Tr>
                <Tr>
                  <Td>User College</Td>
                  <Td>{registration.user_college}</Td>
                </Tr>
                <Tr>
                  <Td>Status</Td>
                  <Td>{registration.is_active ? "Active" : "Not Active"}</Td>
                </Tr>
                <Tr>
                  <Td>Payment Status</Td>
                  <Td>{registration.payment_status}</Td>
                </Tr>
                {registration.competition_type === "team" && (
                  <Tr>
                    <Td>Member</Td>
                    <Td>
                      <ul>
                        {registration.member.map((member, id) => {
                          return <li key={id}>{member.user_fullname}</li>;
                        })}
                      </ul>
                    </Td>
                  </Tr>
                )}
                <Tr>
                  {registration.competition_using_submission &&
                    registration.submission_status === "Submitted" && (
                      <>
                        <Td>Submission</Td>
                        <Td>
                          <embed
                            src={registration.url}
                            className="w-full aspect-[2/3]"
                          />
                        </Td>
                      </>
                    )}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <ModalFooter>
          <Stack direction="row" spacing={4} align="center">
            <Button onClick={onClose}>Close</Button>
          </Stack>
        </ModalFooter>
      </AppModal>
    </>
  );
};

export default Registraion;
