import { Tabs } from "antd";
import MovieList from "./MovieList";


function Admin(){

    const items = [
        {
            key:"1",
            label:"Movies",
            children: <MovieList/>

        },
        {
            key:"2",
            label:"Theatres",
            children: <div>Theatres</div>

        }
    ]

    return(
        <div>
           <h1>Admin Page</h1> 
           <Tabs defaultActiveKey="1" items={items}  />
        </div>
    )
}

export default Admin;