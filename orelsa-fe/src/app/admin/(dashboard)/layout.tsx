import AdminSideBar from "@/components/Admin/Sidebar";

interface IProps {
  children: React.ReactElement;
}

const AdminLayout = ({ children }: IProps) => {
  return (
    <div className="flex justify-between">
      <AdminSideBar />
      <div className="p-5 w-[calc(100%-400px)]">{children}</div>
    </div>
  );
};

export default AdminLayout;
