import { LeftPage } from "~/layout/LeftPage";
import { RightPage } from "~/layout/RightPage";

export default function Recipes() {
  return (
    <>
      <RightPage>
        <div>Page recettes</div>
      </RightPage>
      <LeftPage>
        <div>Kiki la petite souris de la left page</div>
      </LeftPage>
    </>
  )
}