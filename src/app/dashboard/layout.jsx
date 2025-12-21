import "../globals.css";
import Sidebar from "@/composants/Sidebar";
import { DashBoardProvider } from "@/app/Context/dashboardContext";

export const metadata = {
  title: "Dashboard | PublikMarket",
};

export default function dashboardLayout({ children }) {
  return (
    <DashBoardProvider>
      <section>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          {children}
        </div>
      </section>
    </DashBoardProvider>
  );
}
