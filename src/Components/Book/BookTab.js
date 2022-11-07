import React,{useRef,useEffect, useState} from 'react'
import './Book.css'
import CloseIcon from '@mui/icons-material/Close';
import img from '../../Img/img.webp'
import Btn from '../Button/Button'

const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function Book(props) {
    let item = props.book;
    console.log(item.copies);
    let show = ()=>{
        props.set(-1);
    }
    
    const isAdmin = localStorage.getItem('isAdmin');
    const addCopies = useRef(0);
    const deleteCopies = useRef(0);
    const numberOfCopies = useRef();
    const [isIssued,setIssue] = useState(false);
    const [shouldUpdate,setUpdate] = useState(false);

    useEffect(()=>{
        fetch(url_path+"issues/student?token="+localStorage.getItem('token'))
        .then(res=>res.json())
        .then(res=>{
            let list = res.data;
            console.log(list);
            for(let i=0; i<list.length; i++)
            {
                if(list[i].name === item.name){
                    setIssue(true);
                    break;
                }
            }
        }).catch(err=>{
            console.log("");
        }).catch(err=>{
            console.log("");
        })
    },[])

    useEffect(()=>{
        fetch(url_path+"books/"+item.slug+"?token="+localStorage.getItem('token'))
        .then(res=>res.json())
        .then(res=>{
            console.log(numberOfCopies);
            console.log(res);
            console.log(numberOfCopies.current)
            numberOfCopies.current.innerText = res.book[0].copies;
        })
        .catch(err=>{
            console.log(err);
        })
    },[shouldUpdate])

    let issueBook =()=>{
        fetch(url_path+"issues/student/"+item.slug+"?token="+localStorage.getItem('token'),{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            setIssue(true);
        })
    };

    let returnBook = ()=>{
        fetch(url_path+"issues/student/return/"+item.slug+"?token="+localStorage.getItem('token'),{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            console.log(res);
            setIssue(false);
            return res.json();
        })
        .then(res=>{
            console.log(res);
        })
    };

    let interactionPanel = ()=>{
        let res;
        if(isAdmin === 'false')
        {
            if(isIssued){
                res = <div className="row justify-content-end">
                        <Btn change={returnBook} classes="col-1 Red-Btn" text="Return Book"></Btn>
                    </div>
            } else{
                res = <div className="row justify-content-end">
                        <Btn change={issueBook} classes="col-1 Blue-Btn" text="Add Book to account"></Btn>
                    </div>
            }
        }
        else{
            res = <div className="row justify-content-between">
                    <span> No. of copies available: <span ref={numberOfCopies}>{item.copies}</span></span>
                    <div className="input-wrapper col-4 left">
                        <input className = "Number-Input" type="number" min={1} ref={addCopies}></input>
                        <Btn change={additionOfCopies} classes="col-5 Green-Btn admin-access" text="Add copies"></Btn>
                    </div>
                    <div className="input-wrapper col-4 center">
                        <input className = "Number-Input" type="number" min={1} ref={deleteCopies}></input>
                        <Btn change={deletionOfCopies} classes="col-5 Blue-Btn admin-access" text="Delete copies"></Btn>
                    </div>
                    <div className="input-wrapper col-4 right">
                        <Btn change={deleteAll} classes="col-5 Red-Btn admin-access" text="Delete All Copies"></Btn>
                    </div>
                </div>
        }
        return res;
    }

    let additionOfCopies = ()=>{
        let total = item.copies+Number(addCopies.current.value);
        item.copies = total;
        updateCopies(total);
    }
    let deletionOfCopies = ()=>{
        let total = item.copies-Number(deleteCopies.current.value);
        if(total < 0) total=0;
        item.copies = total;
        updateCopies(total);
    }
    let deleteAll = ()=>{
        item.copies = 0;
        updateCopies(0);
    }
    let updateCopies = (copies)=>{
        fetch(url_path+"books/"+item.slug+"?token="+localStorage.getItem('token'),{
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'copies':copies
            })
        })
        .then(res=>{
            console.log(res);
            setUpdate(shouldUpdate===false)
        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <div className="container-fluid Tab">
        <div className="right">
            <button id="close-icon" onClick={show}>
                <CloseIcon fontSize="large"></CloseIcon>
            </button>
        </div>
        <div className="Book-wrapper">
            <div className="Book-Thumbnail">
                <img src={img} alt="Book"></img>
            </div>
            <div className="Book-Details">
                <div className="Title">{item.name}</div>
                <div className="Author"><i>Author: </i>{item.author}</div>
                <div className="Year"><i>Published in: </i>{item.yop}</div>
            </div>
        </div>
        {
            interactionPanel()
        }
    </div>
  )
}

export default Book