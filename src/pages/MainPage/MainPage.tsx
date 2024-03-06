import {ItemsGallery} from "../../components/ItemsGallery";
import {Container} from "@/components/Conatainer/Conatainer.tsx";

export const MainPage = () => {

  return (
    <Container>
      <header>
        <h1>Products List Items</h1>
      </header>
      <main>
        <ItemsGallery/>
      </main>
    </Container>
  )
}