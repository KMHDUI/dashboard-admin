import MainDashboard from "@/components/MainDahboard/MainDahboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin HFG UI",
  description: "This website intended for manage hfg users data",
};

export default function Home() {
  return <MainDashboard />;
}
