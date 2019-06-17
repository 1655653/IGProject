
function wingAnimation(){
    ////******WINGDX */
    //0.5,0.07 wing rota z
    //2.75,2.2 wing rota x
    //0.78,0.68 wing rota y
    if(Math.cos(zidx)*0.5 >0) wingDx.rotation.z = Math.cos(zidx)*0.5;
    else{
        zidx+=0.25*rage;
    }
    zidx+=0.05*rage;

    if(Math.cos(xidx)*2.75 > 2.2) wingDx.rotation.x = Math.cos(xidx)*2.75;
    else{
        xidx+=0.25*rage;
    }
    xidx+=0.05*rage;
    ////******WINGSX */
    //0.5,0.07 wing rota z ok
    //4.0,3.5 wing rota x
    //-0.78,-0.68 wing rota y
    if(Math.cos(zisx)*0.5 >0) wingSx.rotation.z = Math.cos(zisx)*0.5;
    else{
        zisx+=0.25*rage;
    }
    zisx+=0.05*rage;

    if(Math.cos(xisx)*4 > 3.5) wingSx.rotation.x = Math.cos(xisx)*4;
    else{
        xisx+=0.25*rage;
    }
    xisx+=0.05*rage;


}

function losetime(){
    switch (step) {
        case 1:
            head.rotation.y+=0.009;
            if(head.rotation.y>0.54) step = 2;
            break;
    
        case 2:
            head.rotation.y-=0.009;
            if(head.rotation.y<-0.46) step = 3;
            break;
        case 3:
            head.rotation.y+=0.009;
            if(Math.round(head.rotation.y)*10 == 0) step = 4;
            break;
    
        case 4:
            head.rotation.z-=0.009;
            if(head.rotation.z<-0.38) step = 5;
            break;
        case 5:
            head.rotation.z+=0.009;
            if(head.rotation.z>0.60) step = 6;
            break;
    
        case 6:
            head.rotation.z-=0.009;
            if(Math.round(head.rotation.z)*10 == 0) step = 1;
            break;
    
        }    
}