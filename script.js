var animation = false;
var camera;
var Play;
var scene;
var renderer;
var body;
//parabolic vars
var Vo = 50;
var alpha = Math.PI/4;
var Vox = Vo * Math.cos(alpha);
var Voy = Vo * Math.sin(alpha);
var g = 9.81;
var t=0;
var body;
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
    body.rotation.z = -alpha;
    camera.position.z = 5;
    camera.position.x = 0;
    
    document.onkeydown = checkKey;

    Hud();
    document.getElementById("data").innerHTML = "asseX: "+body.position.x+"\n"+"asseY: "+ body.position.y;

    animate();
}

function animate() {
    requestAnimationFrame( animate );
    if(animation) {
        t+=0.01;
        body.position.x = Vox * t; 
        body.position.y = Voy * t -0.5*g*t*t; 
        document.getElementById("data").innerHTML = "asseX: "+ Number(body.position.x).toFixed(3)+"\n"+"asseY: "+ Number(body.position.y).toFixed(3);
        if (body.position.y < 0 ) t = 0;
        
    }
    // body.rotation.y+=0.009;
    // Textmask.offset.y += 0.001;
    renderer.render( scene, camera );
    
}

function addcubbo(){ //sfondo mare
    var geometry = new THREE.BoxGeometry( 70, 35, 0.1 );
    
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: loader.load('images/horizon2.jpg'),
    });
    var body = new THREE.Mesh( geometry, material );
    body.position.x = 6;
    body.position.z = -6;
    scene.add( body );
}


var cameraspeed = 0.8;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        //up arrow
        // camera.position.y+=cameraspeed;
        body.rotation.y+=cameraspeed;
    }
    else if (e.keyCode == '40') {
        // down arrow
        // camera.position.y-=cameraspeed;
        body.rotation.y-=cameraspeed;
    }
    else if (e.keyCode == '37') {
       // left arrow
       Textmask.offset.x += 0.01;
       console.log(Textmask.offset.x);
    //    camera.position.x-=cameraspeed;
    }
    else if (e.keyCode == '39') {
        //right arrow
        Textmask.offset.x -= 0.01;
        console.log(Textmask.offset.x);
    //    camera.position.x+=cameraspeed;
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