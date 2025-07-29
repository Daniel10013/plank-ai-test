import './Home.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setDataOnMemory } from '../../Services/activities';
import Loader from '../../Components/Loader';

function Home() {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=> {
        try{
            const fetchData = async () => {
                const response: {message: string, status: boolean} = await setDataOnMemory();
                if(response.status == false){
                    toast.error('Error fetching data from server!');
                }
            }
            fetchData();
        }
        finally {
            setIsLoading(false)
        }
    }, []);

    if(isLoading == true){
        return <Loader/>
    }
    return (
        <section>
            <h1>Hello! What you wanna do?</h1>
            <div className='buttons'>
                <Link to={'/summary'} className='home-button'>
                    Check Summary
                </Link>
                <Link to={'/trending-actions'} className='home-button'>
                    Check User Actions Trendings
                </Link>
            </div>
        </section>
    );
}

export default Home;