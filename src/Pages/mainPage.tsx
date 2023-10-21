import { observer } from "mobx-react-lite";
import ChattingComponent from "../components/Chats/chattingComponent";

const MainPage = observer(() => {
  return <ChattingComponent />;
});

export default MainPage;
