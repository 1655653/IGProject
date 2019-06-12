var animation = false;
var camera;
var Play;
var scene;
var renderer;
window.onload = function init() {
    scene = new THREE.Scene();

    // const loader = new THREE.TextureLoader();
    // const bgTexture = loader.load('images/horizon2.jpg');
    // scene.background = bgTexture;

    scene.background = new THREE.Color( 0xa0a0a0 );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    

    var geometry = new THREE.BoxGeometry( 1, 1.5, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x43464B } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    addcubbo();

    //*******************/
    //********HEAD */
    var materialpapp = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var headradius = 0.5;
    var geometryhead = new THREE.SphereGeometry( headradius, 32, 50 );
    var head = new THREE.Mesh( geometryhead, materialpapp );
    scene.add( head );

    head.position.y = 1.3;
    //*********BODY */
    var geometryBody = new THREE.SphereGeometry( headradius, 32, 50 );
    geometryBody.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 1.5 ) );
    var body = new THREE.Mesh( geometryBody, materialpapp );
    scene.add( body );
    //*********BECCO */
    var noseradius = 0.15;
    var materialNose = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var geometryNose = new THREE.SphereGeometry( noseradius, 32, 50 );
    geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 1.5 ) );
    var nose = new THREE.Mesh( geometryNose, materialNose );
    nose.position.x = head.position.x+0.5;
    nose.position.y = head.position.y;
    nose.rotation.z = Math.PI / 4;
    scene.add(nose);
    //*****PUNTA DEL BECCO*****
    var geometry = new THREE.CylinderGeometry( 0.001, 0.15, 0.5, 3 );
    var noseEnd = new THREE.Mesh( geometry, materialNose );
    noseEnd.position.x = nose.position.x+0.17;
    noseEnd.position.y = nose.position.y-0.3;
    noseEnd.rotation.z = -Math.PI + Math.PI/10;
    scene.add( noseEnd );
    //**********

    
   
    //*******************/

    camera.position.z = 5;
    camera.position.x = 0;
    document.onkeydown = checkKey;
    Hud();
    document.getElementById("data").innerHTML = "asseX: "+cube.position.x+"\n"+"asseY: "+ cube.position.y;

    var Vo = 20;
    var alpha = Math.PI/6;
    var Vox = Vo * Math.cos(alpha);
    var Voy = Vo * Math.sin(alpha);
    var g = 9.81;
    var t=0;
    function animate() {
        requestAnimationFrame( animate );
        if(animation) {
            t+=0.006;
            cube.position.x = Vox * t; 
            cube.position.y = Voy * t -0.5*g*t*t; 
            document.getElementById("data").innerHTML = "asseX: "+ Number(cube.position.x).toFixed(3)+"\n"+"asseY: "+ Number(cube.position.y).toFixed(3);
        }

        renderer.render( scene, camera );
        
    }
    animate();

    
    

}
function addcubbo(){
    var geometry = new THREE.BoxGeometry( 70, 35, 0.1 );
    
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
        map: loader.load('images/horizon2.jpg'),
    });
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 6;
    cube.position.z = -6;
    scene.add( cube );
}


var cameraspeed = 0.8;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        //up arrow
        camera.position.y+=cameraspeed;
    }
    else if (e.keyCode == '40') {
        // down arrow
        camera.position.y-=cameraspeed;
    }
    else if (e.keyCode == '37') {
       // left arrow
       camera.position.x-=cameraspeed;
    }
    else if (e.keyCode == '39') {
        //right arrow
       camera.position.x+=cameraspeed;
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