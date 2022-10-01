import * as Styles from "./styles"
import { ButtonVariants, IButtonProps } from "./types"


export function Button(props: IButtonProps) {
  const { variant = ButtonVariants.Primary } = props

  return (
    <Styles.Container
      type="button"
      className={`${props.className} ${variant}`}
      {...props}
    >
      {props.children}
    </Styles.Container>
  )
}
