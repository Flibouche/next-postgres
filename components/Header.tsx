// Components
import Nav from "./Nav";

const Header = () => {

    return (
        <header className="w-full bg-primary-50 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="items-center gap-8 xl:flex">
                    <Nav />
                </div>
            </div>
        </header>
    )
}

export default Header