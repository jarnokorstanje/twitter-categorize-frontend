import axios from "axios";

export default axios.create({
  baseURL: "https://node152605-jakor-mongo-node.jelastic.metropolia.fi/graphql",
  headers: {
    "Content-type": "application/json"
  }
});