import { MainContainerI } from "../../types/components/MainContainerI";
import Header from "../Header/Header";

function MainContainer({ children }: MainContainerI) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}

export default MainContainer;
