import { Navbar } from "@/module/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
