import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import CustomEase from "gsap/CustomEase"


gsap.registerPlugin(CustomEase)
CustomEase.create("hop","0.9,0,0.1,1")

export function useRevealer(){
    useGSAP(()=>{
        gsap.from("#revealer",{
            scaleY :0,
            duration : 1,
            delay:0.2,
            ease:"hop"
        })
        // gsap.to("#revealer",{
        //     scaleY :0,
        //     duration : 1,
        //     delay:0.2,
        //     ease:"hop"
        // })
    },{})
    useGSAP(()=>{
        // gsap.from("#revealer",{
        //     scaleY :0,
        //     duration : 1,
        //     delay:0.2,
        //     ease:"hop"
        // })
        gsap.to("#revealer",{
            scaleY :0,
            duration : 1,
            delay:1.4,
            ease:"hop"
        })
    },{})
} 
