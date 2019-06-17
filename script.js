var animation = false;
var camera;
var Play;
var scene;
var renderer;
//parabolic vars
var Vo = 70;
var Vox;
var Voy;
var alpha = Math.PI/4;
var omega;
var Gitt;
var g = 9.81;
var t=0;
var X0=1.9;
var Y0=1.8;
var Hmax;
//model vars
var parrot;
var head
var wingDx;
var wingSx;
var tail;

var legDx;
var FingDx2;
var FingDx3;

var legSx;
var FingSx2;
var FingSx3;

var Textmask;
var Textmask2;
var Textwing;
var Textwingdx;

var wheel;
var wheeldx
var cannon;
var cannonWeight=30;


var delta = 0.1;
var rage = 0.5;
var standby = true;//should be true
var step = 1;

var positioning = true; //should be true
var pointing = true;
var parrotation = 0;
var seeParrot = true;
var once = true;    
var flip = false;    
var loaded = false;
        
window.onload = function init() {
    scene = new THREE.Scene();

    var ambLight = new THREE.AmbientLight( 0x444444 );
    scene.add( ambLight );
    var light = new THREE.DirectionalLight( 0xddfddd, 1 );
    light.position.set( 0, 10, 70 );
    scene.add( light );

    scene.background = new THREE.Color( 0xa0a0a0 );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.lookAt( scene.position );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    addcubeMap(); //sfondo mare
    parrot = drawParrot();
    scene.add(parrot);
    drawCannon();
    drawShip();
    camera.position.z = 5;
    document.onkeydown = checkKey;

    Hud();
    document.getElementById("data").innerHTML = "asseX: 0.0"+"\n"+"asseY: 0.0";
    animate();
    
    
    camera.position.x = parrot.position.x; //tasto camera
    camera.position.y = parrot.position.y;

}
var spin = 0.001;
var decrease = false;
function animate() {
    requestAnimationFrame( animate );
    if(standby) losetime();
    
    if(positioning && loaded && !standby){
        if(parrot.position.x<X0) parrot.position.x+=delta;  //animazione iniziale per arrivare al cannone  
        if(parrot.position.x<Y0) parrot.position.y+=delta;
        else {
            positioning = false;
        }
    }
    if(!positioning && pointing) {
        cannon.add(parrot);
        parrot.position.x = -2.51;
        parrot.position.y = 5.5;
        parrot.rotation.z = 0.07;
    }
    if(animation) {
        t+=0.01;
        
        if(parrot.position.y>-1){ //finche y>0 continua il moto
            parrot.position.x = Vox * t + X0 ; 
            parrot.position.y = Voy * t -0.5*g*t*t + Y0; 
            if(Hmax - parrot.position.y< 0.1){
                decrease = true;
            }
            if(decrease && (Math.abs(parrot.rotation.z)<Math.abs(3*parrotation))) parrot.rotation.z-=0.01;
            wingAnimation();
            
        }

        document.getElementById("data").innerHTML = "asseX: "+ Number(parrot.position.x).toFixed(1)+"\n"+"asseY: "+ Number(parrot.position.y).toFixed(1);
        
        if(cannon.position.x > -Vox/cannonWeight && Vox>0) { //rinculo cannone
            cannon.position.x-=0.009;
            wheel.rotation.z+=0.009;
            wheel.position.x-=0.009;     
            wheeldx.rotation.z+=0.009;
            wheeldx.position.x-=0.009; 
        }

        if(seeParrot){
            camera.position.x = parrot.position.x; //tasto camera
            camera.position.y = parrot.position.y;
        }
        else{
            camera.position.x = 0;
            camera.position.y = 0;
        }
        
    }
    
    renderer.render( scene, camera );
}



var zidx = 0.01;
var zisx = 0.01;
var xidx = 0.01;
var xisx = 0.01;
var cameraspeed = 0.8;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {//up arrow
        if(!positioning && cannon.rotation.z<0){
            alpha+=0.1;
            cannon.rotation.z+=0.1;
            parrotation+=0.1;
            cannon.position.x+=0.1;
            var v = new THREE.Vector3( 0,0,0);
            X0 = cannon.children[0].getWorldPosition(v).x;
            Y0 = cannon.children[0].getWorldPosition(v).y;
        }
    }
    
    else if (e.keyCode == '40') {// down arrow
        if(!positioning && cannon.rotation.z > -Math.PI/2 + 0.1){
            alpha-=0.1;
            cannon.rotation.z-=0.1;
            parrotation-=0.1;
            cannon.position.x-=0.1;
            var v = new THREE.Vector3( 0,0,0);
            X0 = cannon.children[0].getWorldPosition(v).x;
            Y0 = cannon.children[0].getWorldPosition(v).y;
        }
    }
    
    else if (e.keyCode == '37') {// left arrow
        camera.position.x+=0.9;
        console.log(parrot.rotation.z);
    }
    else if (e.keyCode == '39') {//right arrow
        camera.position.x-=0.9;
        console.log(wingSx.rotation);
        // rage+=0.1;
    }
    else if (e.keyCode == '68') {//d 
        camera.position.y+=0.9;
        console.log(wingSx.rotation);
    }
    else if (e.keyCode == '65') {//a 
        camera.position.y-=0.9;
        console.log(wingSx.rotation);
    }
    else if (e.keyCode == '32') { //spacebar
        shot();
    }
}

function Hud(){
    PlayButton();
    fTexBox();
    SeeParrotButton();
    
}
function SeeParrotButton(){
    var seeparrot = document.createElement('button');
    seeparrot.style.position = 'fixed';
    seeparrot.style.width = 100;
    seeparrot.style.height = 40;
    seeparrot.style.fontSize="10px";
    seeparrot.style.fontWeight="bold";
    seeparrot.innerHTML = "See the parrot"; 
    seeparrot.id="seetheparrot";
    seeparrot.style.textAlign = "center";
    seeparrot.style.top = 0;
    seeparrot.style.left = 100;
    seeparrot.style.color = "black";
    document.body.appendChild(seeparrot);
    document.getElementById("seetheparrot").onclick = function() {
        seeParrot = !seeParrot;
    };
}

function PlayButton(){
    Play = document.createElement('button');
    Play.style.position = 'fixed';
    Play.style.width = 100;
    Play.style.height = 40;
    Play.style.fontSize="10px";
    Play.style.fontWeight="bold";
    Play.innerHTML = "Start Animation"; 
    Play.id="Play";
    Play.style.textAlign = "center";
    Play.style.top = 0;
    Play.style.left = 0;
    Play.style.color = "black";
    document.body.appendChild(Play);
    document.getElementById("Play").onclick = function() {
        shot();
    };
}

function shot(){
    if(!animation){
        pointing = false;
        cannon.remove(cannon.children[0]);
        scene.remove( parrot );
        parrot = drawParrot();
        scene.add(parrot);
        parrot.position.x = X0;
        parrot.position.y = Y0;
        parrot.rotation.z += parrotation;
        parrotation = parrot.rotation.z;
        Vox = Vo * Math.cos(alpha);
        Voy = Vo * Math.sin(alpha);
        Hmax = (Voy*Voy)/(2*g);
        Gitt = (2*Vox*Voy)/g;
        omega = Vo/(Gitt/2);
        omega *= (Math.PI/180);

    }
    animation = true;
}

function fTexBox(){
    TextBox = document.createElement('textbox');
    TextBox.style.position = 'fixed';
    TextBox.style.right = 0;
    TextBox.style.bottom = 0;
    TextBox.style.fontSize="50px";
    TextBox.style.fontWeight="bold";
    TextBox.id="data";
    TextBox.style.color = "black";
    TextBox.rows = 2;
    TextBox.cols = 20;
    document.body.appendChild(TextBox);
}

function addcubeMap(){ //sfondo mare
    var imagePrefix = "skybox/";
    var directions  = ["posx","negx","posy", "negy", "posz", "negz"];
    var imageSuffix = ".JPG";
    
    var materialArray = [];
    var times = 30;
    for (var i = 0; i < 6; i++){
        var t = new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix );
        if(i==0 || i == 2 || i ==3){
            t.wrapS = THREE.RepeatWrapping;
            t.wrapT = THREE.RepeatWrapping;
            t.repeat.set( times, 1 );
        }
        materialArray.push( new THREE.MeshBasicMaterial({
            map: t,
            side: THREE.DoubleSide,
            transparent : true
        }));
    }
    var skyGeometry = new THREE.CubeGeometry( 1000, 1000, 1000*times );
    var skyBox = new THREE.Mesh( skyGeometry, materialArray );
    skyBox.rotation.y = Math.PI/2 ;
    skyBox.position.x = skyBox.geometry.parameters.depth/2 - 350;
    skyBox.position.y = 100;
    scene.add( skyBox );
}

//      up? delta = -0.009: delta = 0.009;
//     wingDx.rotation.x+=delta*rage;
//     wingSx.rotation.x+=delta*rage;
//     if(wingDx.rotation.x > 2.81) up = true;
//     if(wingDx.rotation.x < 2.38) up = false;

// if(standby) waiting();
//     function waiting(){
//         if(!blocked) {
//             head.rotation.y = Math.sin(t_head)*Math.PI/4;
//             t_head+=0.01;
//             t_headYes = 0;
//         }
//         if(Math.round(head.rotation.y*10) == 0) {
//             blocked = true;
//             pick();
            
//         }
//     }
    
//     function pick(){
//         head.rotation.y=0;
//         t_headYes+=0.01;
//         parrot.rotation.z = Math.sin(4*t_headYes)*0.2 - Math.PI/4;
//         setTimeout(function(){
//             blocked = false;
//         },2000);
//     }

 // parrot.rotation.z-=Vo*0.0001;
            
            // once? delta = 0.00009: delta = -0.00009;
            // parrot.rotation.z+= Vo * delta;
            // if(parrot.position.y > Hmax) once = false;