function drawParrot(){
    //*******************/
    //*********BODY */
    var materialpapp = new THREE.MeshPhongMaterial( { color: 0xffffff});
    var radius = 0.4;
    var bodyradius = radius*1.2;
    var geometryBody = new THREE.SphereGeometry( bodyradius, 10, 10 );
    geometryBody.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 1.5 ) );
    body = new THREE.Mesh( geometryBody, materialpapp );

    body.rotation.z = - Math.PI/20;
    body.position.x = - 0.1;

    //********HEAD */
    var geometryhead = new THREE.SphereGeometry( radius, 10, 10 );
    geometryhead.applyMatrix( new THREE.Matrix4().makeScale( 1.2, 1.0, 1.0 ) );
    var head = new THREE.Mesh( geometryhead, materialpapp );

    head.position.y = 1.2;
    body.add( head );
    
    // console.log(body.children[0].position.y);

    //*********NOSE*/
    var noseradius = 0.15;
    var materialNose = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var geometryNose = new THREE.SphereGeometry( noseradius, 32, 50 );
    geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 1.5 ) );
    var nose = new THREE.Mesh( geometryNose, materialNose );
    
    nose.rotation.z = + Math.PI/20 + Math.PI / 4;
    nose.position.x+=0.5;
    head.add(nose);
    

    //*****ENDNOSE*****
    var geometryNoseEnd = new THREE.CylinderGeometry( 0.001, 0.15, 0.2, 4 );

    var noseEnd = new THREE.Mesh( geometryNoseEnd, materialNose );
    noseEnd.position.x -= 0.10;
    noseEnd.position.y -= 0.16;
    nose.add( noseEnd );

    // console.log(nose.children[0].position.y);
    // console.log(nose.children[0].position.x);
    
    //*****WINGDX*****
    var radius = 0.4;
    var wingradius = radius*1.4;
    var geometryWing = new THREE.SphereGeometry( wingradius, 32, 50 );
    geometryWing.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 0.2 )  );
    wingDx = new THREE.Mesh( geometryWing, materialpapp );
    scene.add(wingDx);

    // wingSx = new THREE.Mesh( geometryWing, materialpapp );
    // scene.add(wingSx);
    


    //**********
    scene.add( body );
    body.position.x = 3;
}