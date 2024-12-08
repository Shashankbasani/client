import { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { CurrentUsers } from "../API/users";
import{ message, Menu,Layout } from "antd"
import { Header } from "antd/es/layout/layout";
import {HomeOutlined,LogoutOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";

function ProtectedRoute({children}){
    
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    async function ValidateUser(){
        try {
            const response = await CurrentUsers();
            console.log("am inside validUswer"+response)
            if(response.success)
                setUser(response.data);
          

            message.success(response.message)
            return response;
            //debugger;
            // if(!response)
            //     navigate("/login")
            //navigate("/")
        } catch (error) {
            console.log(error)
             message.error(error.message)
           // return {success : false}
        }

    }



    useEffect(()=>{
    const checkUser = async()=> {
          if(localStorage.getItem('token')){
             let valid=  await ValidateUser()

                //if(window.location.pathname === '/'){//}
                console.log(valid.success)
                 if(!valid.success){
                        navigate("/login")
                 }
                else if(valid.data.isAdmin && window.location.pathname === '/admin'){
                    navigate("/admin")
                }else if(!valid.data.isAdmin && window.location.pathname === '/admin' || valid.data.isAdmin && window.location.pathname === '/profile' ){
                    navigate("/profile")
                }
            
        } else{
            navigate("/login")
        } 

    }
        checkUser();
    },[])

    const navItems =[
        {
            label:(
                <span onClick={()=>{
                    navigate('/')
                }}>
                Home</span>
            ),
            icon: <HomeOutlined/>
        },
        {
            label:`${user ? user.name : ""}`,
            icon : <UserOutlined/>,
            children : [
                {
                    label:(
                        <span onClick={()=>{
                            user.isAdmin ? navigate("/admin") : navigate('/profile')
                        }}>
                        Profile</span>
                    ),
                    icon : <ProfileOutlined/>
                },
                {
                    label:(
                   <Link to={"/login"} onClick={()=>{
                    localStorage.removeItem("token");
                   }}>Logout</Link>
                    ),
                    icon : <LogoutOutlined/>
                }
            ]
        }
    ]

    return(
        <Layout>
            <Header
            className="d-flex justify-content-between"
            style={{
                position:"sticky",
                top:0,
                zIndex:1,
                width:"100%",
                display:"flex",
                alignItems:"center",
            }}
            >
            <h3 className="demo-logo text-white m-0" style={{color:"white"}}>
                Book My Show
            </h3>
            <Menu mode="horizontal" theme="dark" items={navItems}/>
            </Header>
        <div style={{padding:24, minHeight:380, background:"#fff"}}>
            {children}
        </div>
        </Layout>
    )
}

export default ProtectedRoute;