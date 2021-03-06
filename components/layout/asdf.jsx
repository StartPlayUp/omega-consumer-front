import Header from "../header";
import Footer from "../footer";

const Layout = ({children}) => {
    return (
        <div style={{display:"block"}}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
export default Layout;