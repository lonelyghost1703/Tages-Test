import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [result, setResult] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((usersRes) => usersRes.json())
        .then((json) => setUsersData(json));

      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((postsRes) => postsRes.json())
        .then((json) => setPostsData(json));

      const finalResult = usersData.map((user) => {
        const finalObj = {};
        finalObj.id = user.id;
        finalObj.name = user.name;
        finalObj.email = user.email;
        finalObj.address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
        finalObj.website = `https://${user.website}`;
        finalObj.company = user.company.name;
        finalObj.posts = postsData
          .filter((p) => p.userId === user.id)
          .map((post) => {
            const finalPost = {};
            finalPost.title = post.title;
            finalPost.title_crop = `${post.title.slice(0, 20)}...`;
            finalPost.body = post.body;
            return finalPost;
          });
        return finalObj;
      });
      setResult(finalResult);
    };
    getData();
  }, []);

  console.log("result", result);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
