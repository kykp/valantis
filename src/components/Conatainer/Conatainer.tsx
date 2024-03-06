import {ReactNode} from "react";
import cls from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const {children} = props;
  return (
    <div className={cls.Container}>
      {children}
    </div>
  )
}