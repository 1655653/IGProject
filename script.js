var animation = false;
var camera;
var Play;
var scene;
var renderer;
var parrot;
//parabolic vars
var Vo = 50;
var alpha = Math.PI/4;
var g = 9.81;
var t=0;
var X0=1.9;
var Y0=1.8;
//model vars
var wingDx;
var pivot;
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

window.onload = function init() {
    scene = new THREE.Scene();

    var ambLight = new THREE.AmbientLight( 0x444444 );
    scene.add( ambLight );
    var light = new THREE.DirectionalLight( 0xddfddd, 1 );
    light.position.set( -10, 10, 10 );
    scene.add( light );

    scene.background = new THREE.Color( 0xa0a0a0 );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.lookAt( scene.position );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    

    // addcubbo(); //sfondo mare
    drawParrot();
    drawCannon();
    camera.position.z = 5;
    camera.position.x = 0;
    
    document.onkeydown = checkKey;

    Hud();
    document.getElementById("data").innerHTML = "asseX: "+ (parrot.position.x - Math.abs(X0))+"\n"+"asseY: "+ (parrot.position.y - Math.abs(Y0));

    animate();
}

function animate() {
    requestAnimationFrame( animate );
     
    parrot.rotation.z = cannon.rotation.z;
    parrot.position.x=X0;   
    parrot.position.y=Y0;   
    if(cannon.rotation.z>-Math.PI/4) Y0 = 1.7;
    if(animation) {
        var cannonWeight=30;
        t+=0.01;
        var Vox = Vo * Math.cos(alpha);
        var Voy = Vo * Math.sin(alpha); 
        parrot.position.x = Vox * t + X0; 
        parrot.position.y = Voy * t -0.5*g*t*t + Y0; 
        document.getElementById("data").innerHTML = "asseX: "+ Number(parrot.position.x).toFixed(3)+"\n"+"asseY: "+ Number(parrot.position.y).toFixed(3);
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

function addcubbo(){ //sfondo mare
    var geometry = new THREE.BoxGeometry( 70, 35, 0.1 );
    
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: loader.load('images/horizon2.jpg'),
    });
    var cubo = new THREE.Mesh( geometry, material );
    cubo.position.x = 6;
    cubo.position.z = -6;
    scene.add( cubo );
}


var cameraspeed = 0.8;
function checkKey(e) {
    var span = 0.4;
    e = e || window.event;
    if (e.keyCode == '38') {//up arrow
        if(cannon.rotation.z<0){
            alpha+=0.1;
            cannon.rotation.z+=0.1;
            cannon.position.x+=0.1;
            X0-=span;
            Y0+=span;
        }
        if(cannon.rotation.z>-Math.PI/4) Y0 = 1.7;
    }
    
    else if (e.keyCode == '40') {// down arrow
        if(cannon.rotation.z > -Math.PI/2 ){
            alpha-=0.1;
            cannon.rotation.z-=0.1;
            cannon.position.x-=0.1;
            X0+=span;
            Y0-=span;
        }
    }
    else if (e.keyCode == '37') {// left arrow
      
    }
    else if (e.keyCode == '39') {//right arrow
       
    }
    else if (e.keyCode == '32') { //spacebar
        animation = !animation;

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