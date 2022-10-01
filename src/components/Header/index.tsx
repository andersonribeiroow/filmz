import { FormEvent, useState } from "react"
import { FaBars, FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { Button } from "../Button"
import { Link } from "../Link"
import * as Styles from "./styles"

export function Header() {
  const navigate = useNavigate()

const [search, setSearch] = useState('')

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();

  if (search) {
    navigate(`/search?keyword=${search}`)
  }
}

  return (
    <Styles.Container>
      <div>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo de Filmz. Botão de play ao lado do texto 'Filmz'"
            />
          </Link>
          <Link to="/">
            <FaHome />
            Home
          </Link>
          <Link to="/wishlist">
            <FaBars />
            Minha lista
          </Link>
      </div>

      <form className="search-wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquise um filme"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Button style={{ borderRadius: '0 4px 4px 0' }} type="submit">Pesquisar</Button>
      </form>
    </Styles.Container>
  )
}
