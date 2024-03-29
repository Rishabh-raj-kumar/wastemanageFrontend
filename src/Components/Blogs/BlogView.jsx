import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    async function getData(){
    try {
      const docSnap = await getDoc(doc(db, "blogs", id));

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setBlog(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }
  getData()
    console.log(blog)
  }, []);
  return (
    <div className=" text-black p-1 font-openSans">
      {/* {console.log(blog)} */}
      <h1 className=" text-xl my-2 capitalize font-medium">Title :  {blog.Title}</h1>
      <p className=" text-lg my-2 capitalize font-medium">Tag : <span className=" bg-purple-200 text-sm p-1 px-2 rounded-full text-purple-700">{blog.Tag}</span></p>
      <img className=" w-full h-80 object-contain rounded" src={blog.coverImg}/>
      <div dangerouslySetInnerHTML={{__html : blog.Body}}></div>
    </div>
  );
}

export default BlogView;
