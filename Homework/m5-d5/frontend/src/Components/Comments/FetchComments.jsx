import { useEffect, useState } from "react";
import CommentsItems from "./CommentsItems";

const Fetchcomments = () => {

//     const [comments, setComments] = useState([])

//     useEffect(() => {
//         fetchComments()
//     }, [])

//     const fetchComments = async ({productId}) => {
//         try {
//             const responce = await fetch(
//                 `https://striveschool-api.herokuapp.com/api/product/${productId}/comments`,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`
//                     },
//                 }
//             );
//             if (!responce.ok) {
//                 throw new Error("fail to fetch");
//             }
//             const data = responce.json()
//             setComments(data)
//         } catch (error) {
//             throw new Error(error);
//         }
//     };
//     return (
//         <>
//             {comments && comments.map(c => 
//                 <CommentsItems key={p.id} {...c}/>
//             )}
//         </>
//     )
// }


return(
    <>
    <CommentsItems/>
    </>
)

}
export default Fetchcomments