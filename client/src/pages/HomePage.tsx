import { RefObject, useEffect, useRef } from "react";
import CreateComponent from "../compoents/CreateComponent/CreateComponent";
import MainContainer from "../compoents/MainContainer/MainContainer";
import WelcomeComponent from "../compoents/WelcomeComponent/WelcomeComponent";

function HomePage() {
  const createRef = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    window.scroll({ top: 0 });
    const target = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        console.log("up");
      } else {
        createRef.current?.scrollIntoView();
        console.log("down");
      }
    };
    window.addEventListener("wheel", target);

    return () => {
      window.removeEventListener("wheel", target);
    };
  }, []);

  const btnClick = () => {
    createRef.current?.scrollIntoView();
  };

  return (
    <MainContainer>
      <WelcomeComponent clickAction={btnClick} />
      <div ref={createRef} className={"create"}>
        <CreateComponent />
      </div>
    </MainContainer>
  );
}

export default HomePage;
