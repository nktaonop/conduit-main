import ContainerPage from "./components/container-page/container-page";
import MainPage from "./components/main/main";
import { TagsProvider } from "./context/TagsContext";

export default function Home() {
  return (
    <TagsProvider>
      <MainPage />
      <ContainerPage />
    </TagsProvider>
  );
}
