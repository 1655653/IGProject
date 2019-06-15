function drawCannon(){
    var radius = 1.5;
    var wheelgeom = new THREE.TorusGeometry( radius, 0.2, 6, 100 ); //TorusGeometry(radius : tube :  radialSegments :  tubularSegments : Integer, arc : Float)
    var woodmaterial = new THREE.MeshPhongMaterial( { color: 0xa0522d , specular: 0x826c6c, shininess: 0,flatShading:true} );
    wheel = new THREE.Mesh( wheelgeom, woodmaterial );
    var axgeom = new THREE.BoxGeometry(2*radius, 0.1 ,0.1);
    var ax1 = new THREE.Mesh( axgeom, woodmaterial );
    var ax2 = ax1.clone();
    var ax3 = ax1.clone();
    var ax4 = ax1.clone();
    ax2.rotation.z = Math.PI/4;
    ax3.rotation.z = Math.PI/2;
    ax4.rotation.z = -Math.PI/4;
    var centergeom = new THREE.CylinderGeometry(0.2, 0.1, 0.2);
    var cannonmaterial = new THREE.MeshStandardMaterial({color: 0x00000, emissive:0x211d1d, metalness: 1, roughness: 1});
    var center = new THREE.Mesh( centergeom,cannonmaterial);
    center.rotation.x = Math.PI/2;
    wheel.add( ax1 );
    wheel.add( ax2 );
    wheel.add( ax3 );
    wheel.add( ax4 );
    wheel.add( center );
    wheel.position.y = -2.5;
    // wheel.rotation.z-=0.009; //ruoti e ti muovi
    // wheel.position.x+=0.009;
    wheeldx = wheel.clone();
    wheeldx.position.z = 2.5;
    var cannongeom = new THREE.CylinderGeometry(1.5, 1.9, 7, 8, 1,false );
    cannongeom.translate( -2.5, 2.5, 0 );
    cannon = new THREE.Mesh(cannongeom, cannonmaterial);
    cannon.position.y = -4;
    cannon.rotation.z = -Math.PI/4;
    scene.add(wheel);
    scene.add(wheeldx);
    scene.add(cannon);

    
}