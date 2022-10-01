import * as Styles from "./styles"
import { ILinkProps } from "./types"


export function Link(props: ILinkProps) {
  return (
    <Styles.Container
      className={({ isActive }) =>
        `${props.className} ${isActive ? "active" : ""}`
      }
      {...props}
    >
      {props.children}
    </Styles.Container>
  )
}
