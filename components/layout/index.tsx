import Header from "../header";
import Footer from "../footer";


type Props = {
    children: JSX.Element,
  };

const Layout = ({children}:Props):JSX.Element => {
    return (
        <div className="flex flex-col">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
export default Layout;