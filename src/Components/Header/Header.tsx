import { ContainerHeader } from "./HeaderStyle";
function Header() {
    return (
        <ContainerHeader>
            <p> Agenda </p>
            <input type="text" placeholder="Pesquisar Tarefa"/>
        </ContainerHeader>
    )
}
export default Header;