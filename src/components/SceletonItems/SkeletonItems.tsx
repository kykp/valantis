import Skeleton, {SkeletonTheme} from "react-loading-skeleton";


import cls from "./SceletonItems.module.css";

import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonItems = () => {
 return(
   <div className={cls.SkeletonItems}>
     <SkeletonTheme baseColor="#202020" highlightColor="#444">
         <Skeleton count={50} height={25}/>
     </SkeletonTheme>
   </div>
 )
}