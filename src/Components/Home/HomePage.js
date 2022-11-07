import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import logo from '../../Img/logo_black.png'
import Search from '../Search/SearchBar';
import Feed from '../Feed/Feed'
import Book from '../Book/BookTab'
import { Link } from "react-router-dom";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";


const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function Home(){
    const nav = useNavigate();
    let check = ()=>{
        if(localStorage.getItem('token') == null) nav("/");
    }
    const [books,setBooks] = useState('');
    const [singlebook,setSingleBook] = useState(-1);
    const [list,setList] = useState([]);
    const isAdmin = localStorage.getItem('isAdmin');    
    //for search query
    useEffect(()=>{
        check();
        if(books === ''){
            axios.get(url_path+"books/")
            .then((res)=>{
                setList(res.data.books);
            }).catch(err=>{
                setList([]);
            })
        }
        else{
            axios.get(url_path+"books/search/"+books)
            .then((res)=>{
                setList(res.data.books);
            }).catch(err=>{
                setList([]);
            })
        }
    },[books]);

    //To add list's item
    let add = ()=>{
        if(singlebook !== -1) return <Book set={setSingleBook} book={singlebook}></Book>
        return list.map((item)=>{
            if(item.copies !== 0) return <Feed key={item._id} title={item.name} author={item.author} year={item.yop} set={setSingleBook} book={item} text="Open" classes="col-2 Green-Btn"></Feed>
        })
    }
    let access = ()=>{
        let res;
        if(isAdmin==='false')
        {
            res = <Link to="/mycollection">
                    <LocalLibraryIcon sx={{color:'black'}} fontSize="large"></LocalLibraryIcon>
                </Link>
        }
        else
        {
            res= <Link to="/addnewbook">
                <AddCircleIcon fontSize="large" sx={{color:'black'}}></AddCircleIcon>
            </Link>
        }
        return res;
    }
    let logout = ()=>{
        localStorage.clear();
        window.location.reload();
    }
    return(
        <div className="container-fluid Home">
            <div className="row align-items-center justify-content-between Header">
                <div className="col-2">
                    <img src={logo} className="Logo" alt="Book Bank"></img>
                </div>
                <div className="col-6">
                    <Search set={setBooks}></Search>
                </div>
                <div className="col-4 panel right">
                    {
                        access()
                    }
                    <button className="none" onClick={logout}>
                        <LogoutIcon fontSize="large" sx={{color:'black'}}></LogoutIcon>
                    </button>
                </div>
            </div>
            <div className="row justify-content-start">
                {
                    add()
                }
            </div>
        </div>
    )
}
export default Home;