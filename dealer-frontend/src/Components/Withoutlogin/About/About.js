import React from 'react'
import { GiArchiveRegister } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { VscSignIn } from "react-icons/vsc";
const About = () => {
    return (
        <>
            <div className="container" style={{marginTop:'2%'}}>
                <div className="container" style={{height:'150px', width:'70%',marginTop:'5%',marginBottom:'5%',display:'flex',justifyContent:'center',alignContent:'center',flexDirection:'column',alignItems:'center',border:'1px solid #6693d0',borderRadius:'15px',backgroundColor:'#6693d0'}}>
                <p style={{fontWeight:'500',fontSize:'1.25rem',color:'white'}}>Join DriveAid Today: Enjoy Exclusive Benefits and Boost Your Business 
                    with Our Dealer Registration Offer!
                    </p>
                <a href="/dealer/register" style={{fontWeight:'500',fontSize:'1.25rem',color:'white'}}>Join Now!</a>
                </div>
                
                <div class="card-group" >
                    <div class="card" style={{margin:'2%',border:'1px solid black'}}>
                        <VscSignIn style={{height:'15%',width:'15%',margin:'2%'}}/>
                        <div class="card-body">
                            <p class="card-title" style={{fontWeight:'800', fontSize:'1.75rem'}}>Become a Service Provider with DriveAid</p>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div class="card" style={{margin:'2%',border:'1px solid black'}}>
                    <GiArchiveRegister style={{height:'15%',width:'15%',margin:'2%'}}/>
                        <div class="card-body">
                            <p class="card-title" style={{fontWeight:'800', fontSize:'1.75rem'}}>Step-by-Step Registration Guide</p>
                            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div class="card" style={{margin:'2%',border:'1px solid black'}}>
                    <MdOutlineMenuBook style={{height:'15%',width:'15%',margin:'2%'}}/>
                    
                        <div class="card-body">
                            <p class="card-title" style={{fontWeight:'800', fontSize:'1.75rem'}}>Beginner's guide for providing Services on DriveAid</p>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
