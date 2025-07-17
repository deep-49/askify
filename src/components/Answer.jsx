import { useEffect,useState } from "react";
import { checkHeading, replaceHeadingStar } from "../helper";

const Answer = ({ ans ,index }) => {
const [heading , setHeading] = useState(false);
const [answer, setAnswer] = useState(ans);

    
    useEffect(()=>{
        if(checkHeading(ans)){
            setHeading(true);
            setAnswer(replaceHeadingStar(ans));
        }   
        
    }, []);


    return (
        <>

        { index == 0  ?<span className="text-xl block text-white">{answer}</span>:
        heading?<span className="pt-2 text-lg block text-white">{answer}</span>:<span className="pl-5 text-m text-zinc-300">{answer}</span>}
        </>
    );
};
export default Answer;
