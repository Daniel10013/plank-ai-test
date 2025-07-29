import { Link } from "react-router-dom"
import './BackToHome.css'

function BackToHome () {
    return (
        <div className="back-div">
            <Link to={"/home"}><span>{`<-`} Back to home</span></Link>
        </div>
    )
}

export default BackToHome;