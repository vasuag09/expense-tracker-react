import logoImg from "../assets/logo.png"
export default function Header(){
    return (
        <header>
            <img src={logoImg} alt="" />
            <p>Keep track of all your expenses</p>
        </header>
    )
}