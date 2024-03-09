import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export const SkeletonPagination = () => {

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton count={1} height={25}/>
    </SkeletonTheme>
  )
}