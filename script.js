var animation = false;
var camera;
var Play;
var scene;
var renderer;
//parabolic vars
var Vo = 50;
var alpha = Math.PI/4;
var g = 9.81;
var t=0;
var X0=1.9;
var Y0=1.8;
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

var delta = 0.1;
var rage = 1;
var standby = false;
var step = 1;

var positioning = true;
var pointing = true;
          
        
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
    camera.position.z = 25;
    
    
    document.onkeydown = checkKey;

    Hud();
    document.getElementById("data").innerHTML = "asseX: 0.0"+"\n"+"asseY: 0.0";
    animate();

}
function animate() {
    requestAnimationFrame( animate );
    if(standby) losetime();
    if(positioning){
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
        var cannonWeight=30;
        t+=0.01;
        var Vox = Vo * Math.cos(alpha);
        var Voy = Vo * Math.sin(alpha); 
        parrot.position.x = Vox * t + X0; 
        parrot.position.y = Voy * t -0.5*g*t*t + Y0; 
        document.getElementById("data").innerHTML = "asseX: "+ Number(parrot.position.x).toFixed(1)+"\n"+"asseY: "+ Number(parrot.position.y).toFixed(1);
        if(cannon.position.x > -Vox/cannonWeight && Vox>0) {
            cannon.position.x-=0.009;
            wheel.rotation.z+=0.009;
            wheel.position.x-=0.009;     
            wheeldx.rotation.z+=0.009;
            wheeldx.position.x-=0.009; 
        }
            
    }
    renderer.render( scene, camera );
}




var cameraspeed = 0.8;
function checkKey(e) {
    var span = 0.3;
    e = e || window.event;
    if (e.keyCode == '38') {//up arrow
        if(!positioning && cannon.rotation.z<0){
            alpha+=0.1;
            cannon.rotation.z+=0.1;
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
            cannon.position.x-=0.1;
            var v = new THREE.Vector3( 0,0,0);
            X0 = cannon.children[0].getWorldPosition(v).x;
            Y0 = cannon.children[0].getWorldPosition(v).y;
        }
    }
    else if (e.keyCode == '37') {// left arrow
        // console.log(cannon);
        cannon.remove(cannon.children[0]);
        scene.add(parrot);
        pointing = false;
        console.log(cannon.children.length);
    }
    else if (e.keyCode == '39') {//right arrow
        head.rotation.y -= 0.009;
        rage/=2;
        console.log(head.rotation.y);
    }
    else if (e.keyCode == '68') {//d 
        // wingDx.rotation.y += 0.009;
        head.rotation.z+= 0.009;
        console.log(head.rotation.z);
    }
    else if (e.keyCode == '65') {//a 
        // wingDx.rotation.y -= 0.009;
        head.rotation.z-= 0.009;

        console.log(head.rotation.z);
    }
    else if (e.keyCode == '32') { //spacebar
        if(!animation){
            pointing = false;
            cannon.remove(cannon.children[0]);
            scene.remove( parrot );
            parrot = drawParrot();
            scene.add(parrot);
            parrot.position.x = X0;
            parrot.position.y = Y0;
            camera.position.x = parrot.position.x;
            camera.position.y = parrot.position.y;  
        }
        animation = !animation;

    }
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

function Hud(){
    PlayButton();
    fTexBox();
    
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
        var s;
        animation? s = "Start": s ="Stop";
        animation = !animation;
        document.getElementById("Play").innerHTML = s+" Animation";
    };
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
    var times = 3;
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
    var skyGeometry = new THREE.CubeGeometry( 500, 500, 500*times );
    var skyBox = new THREE.Mesh( skyGeometry, materialArray );
    skyBox.rotation.y = Math.PI/2 ;
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