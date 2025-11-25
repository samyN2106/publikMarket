import "../globals.css";
import Sidebar from "@/composants/Sidebar";

export const metadata = {
  title: "Dashboard | PublikMarket",
};

export default function dashboardLayout({ children }) {
  return (
    <section>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
