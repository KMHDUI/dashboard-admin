"use client";

import { DataContextState, State, useDataContext } from "@/context/DataContext";
import { Registration } from "@/types/types";
import {
  Button,
  ModalFooter,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
import { useEffect, useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import axios from "axios";
import formatCurrency from "@/utils/formatCurrency";

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

  return (
    <div>
      <div className="text-black text-[1.9em] text-center">
        {State.REGISTRATION}
      </div>
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
        <Table variant="simple">
          <TableCaption>{State.REGISTRATION}</TableCaption>
          <Thead>
            <Tr>
              <Th className="text-center">Registration Id</Th>
              <Th>Competition Name</Th>
              <Th>User Fullname</Th>
              <Th className="text-center">Total Payment</Th>
              <Th className="text-center">Payment Status</Th>
              <Th className="text-center">Submission Status</Th>
              <Th className="text-center">Action</Th>
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
              <Th className="text-center">Payment Status</Th>
              <Th className="text-center">Payment Status</Th>
              <Th className="text-center">Submission Status</Th>
              <Th className="text-center">Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

const TableRow = ({ registration }: { registration: Registration }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { getResgitrationData } = useDataContext() as DataContextState;
  const verifyPaymentHandler = async (status: 0 | 1) => {
    try {
      await axios.post(`${process.env.API_URL}/api/v1/payment/verify`, {
        billId: registration.bill.id,
        status: status,
      });
      getResgitrationData();
    } catch (error) {}
  };
  return (
    <>
      <Tr className="cursor-pointer" onClick={onOpen}>
        <Td className="text-center font-bold">
          #{registration.id.toUpperCase().substring(0, 6)}
        </Td>
        <Td>{registration.competition_name}</Td>
        <Td>{registration.user_fullname}</Td>
        <Td className="text-center">
          {formatCurrency(registration.bill.bill_total)}
        </Td>
        <Td
          className={`text-center text-[0.8rem] font-bold ${
            registration.payment_status === "Not Paid"
              ? "text-[#ED4337]"
              : registration.payment_status === "Pending"
              ? "text-[#FFA500]"
              : "text-[#198754]"
          }`}
        >
          {registration.payment_status}
        </Td>
        <Td className="text-center text-[0.8rem] font-black">
          <span></span>
          {!registration.submission_status ? (
            ""
          ) : (
            <span
              className={`${
                registration.submission_status === "Submitted"
                  ? "text-[#198754]"
                  : "text-[#ED4337]"
              }`}
            >
              {registration.submission_status}
            </span>
          )}
        </Td>
        <Td className="flex justify-center">
          <Popover placement="auto-end">
            <PopoverTrigger>
              <SettingsIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PopoverHeader fontWeight="semibold">Action</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Stack className="fit-content flex flex-col items-center justify-center gap-2 text-[#fff] font-black text-[0.8rem]">
                  <a
                    href={registration.url}
                    target="_blank"
                    className={`${
                      !registration.url && "cursor-not-allowed"
                    } rounded-md p-2 bg-[#3085C3]`}
                    onClick={(e) => {
                      if (!registration.url) e.preventDefault();
                    }}
                  >
                    View Submission
                  </a>
                  <a
                    href={
                      registration.payment.image_url ??
                      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                    }
                    target="_blank"
                    className={`${
                      registration.payment_status !== "Pending" &&
                      "cursor-not-allowed"
                    } rounded-md p-2 bg-[#35A29F]`}
                    onClick={(e) => {
                      if (registration.payment_status !== "Pending")
                        e.preventDefault();
                    }}
                  >
                    View Transfer Receipt
                  </a>
                  <a
                    target="_blank"
                    className={`${
                      registration.payment_status !== "Pending" &&
                      "cursor-not-allowed"
                    } rounded-md p-2 bg-[#198754]`}
                    onClick={(e) => {
                      if (registration.payment_status !== "Pending") {
                        e.preventDefault();
                        return;
                      }
                      verifyPaymentHandler(1);
                    }}
                  >
                    Accept Payment
                  </a>
                  <a
                    target="_blank"
                    className={`${
                      registration.payment_status !== "Pending" &&
                      "cursor-not-allowed"
                    } rounded-md p-2 bg-[#ED4337]`}
                    onClick={(e) => {
                      if (registration.payment_status !== "Pending") {
                        e.preventDefault();
                        return;
                      }
                      verifyPaymentHandler(0);
                    }}
                  >
                    Reject Payment
                  </a>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Td>
      </Tr>
      <AppModal
        appSize="2xl"
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
                <Tr className="">
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
