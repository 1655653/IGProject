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
    Textmask = new THREE.TextureLoader().load('images/mask.PNG');
    // Textmask.offset.x = -0.29; // 0.0 - 1.0
    Textmask.offset.y = 0.11; 
    Textmask.offset.x = 0.01; 
    var materialHeadpapp = new THREE.MeshPhongMaterial( { color: 0xff0000, map: Textmask ,transparent : true});
    var geometryhead = new THREE.SphereGeometry( radius, 10, 10 );
    geometryhead.applyMatrix( new THREE.Matrix4().makeScale( 1.2, 1.0, 1.0 ) );
    var head = new THREE.Mesh( geometryhead, materialHeadpapp );
    var head2 = new THREE.Mesh( geometryhead, materialpapp );

    head.position.y = 1.2;
    body.add( head );
    head.add( head2 );
    
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
    var geometryNoseEnd = new THREE.CylinderGeometry( 0.001, 0.15, 0.3, 4 );

    noseEnd = new THREE.Mesh( geometryNoseEnd, materialNose );
    noseEnd.position.x = -0.10;
    noseEnd.position.y = -0.10;
    noseEnd.rotation.y = -0.10;
    noseEnd.rotation.z = -0.036;
    nose.add( noseEnd );

    // console.log(nose.children[0].position.y);
    // console.log(nose.children[0].position.x);
    
    //*****WINGDX*****
    var wingradius = radius*1.4;
    var geometryWing = new THREE.SphereGeometry( wingradius, 32, 50 );
    geometryWing.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.8, 0.2 )  );
    geometryWing.translate( 0, 1.5, 0 );

    wingDx = new THREE.Mesh( geometryWing, materialpapp );
    wingDx.rotation.x = Math.PI; //default
    wingDx.rotation.x -= Math.PI/6;//sistema carina
    wingDx.rotation.y += Math.PI/4;
    wingDx.rotation.z = Math.PI/10;

    wingDx.position.y = 1.3;
    wingDx.position.z = bodyradius-0.2;
    body.add(wingDx);

    //*****WINGSX*****
    wingSx = new THREE.Mesh( geometryWing, materialpapp );
    wingSx.rotation.x = Math.PI;
    wingSx.rotation.x += Math.PI/6;
    wingSx.rotation.y -= Math.PI/4;
    wingSx.rotation.z = Math.PI/10;

    wingSx.position.y = 1.3;
    wingSx.position.z = -bodyradius+0.2;
    body.add(wingSx);
    
    //*****TAIL*****
    var geometryTail = new THREE.CylinderGeometry( 0.001, 0.4, 3.5, 3, 1 );
    geometryTail.translate( 0, 1.5, 0 );
    tail = new THREE.Mesh( geometryTail, materialpapp );
    tail.rotation.z = 2.8; //default
    body.add(tail);

    //**********************LEG        RIGHT       *****
    var legradius = noseradius/3;
    var materialleg = new THREE.MeshPhongMaterial( { color: 0xe7d04d});
    var geometryLeg = new THREE.SphereGeometry( legradius, 32, 50 );
    geometryLeg.applyMatrix( new THREE.Matrix4().makeScale( 1.0,3.9, 1.5 ) );
    legDx = new THREE.Mesh(geometryLeg,materialleg);
    legDx.position.y = -1;
    legDx.position.x = 0.05;
    legDx.position.z = 0.25;
    legDx.rotation.z = 0.064;
    legDx.rotation.y = Math.PI/3;
    body.add(legDx);
    //*****Fingerdx1*****
    var fingradius = legradius/1.2;
    var geometryFinger = new THREE.SphereGeometry( fingradius, 32, 50 );
    geometryFinger.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.9, 1.5 ) );
    var FingDx1 = new THREE.Mesh(geometryFinger,materialleg);
    FingDx1.rotation.z = Math.PI/2 + 0.5;
    FingDx1.position.y = -0.20;
    FingDx1.position.x = -0.12;
    legDx.add(FingDx1);
    //*****Fingerdx11*****
    var minifingradius = legradius/1.2;
    var geometryMiniFinger = new THREE.SphereGeometry( minifingradius, 32, 50 );
    geometryMiniFinger.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.7, 1.5 ) );
    var FingDx11 = new THREE.Mesh(geometryMiniFinger,materialleg);
    // FingDx11.position.y = -0.7;
    FingDx11.rotation.z = -FingDx1.rotation.z;
    FingDx11.position.y = 0.1;
    FingDx11.position.x = -0.05;
    FingDx1.add(FingDx11);
    //*****Fingerdx2*****
    FingDx2 = new THREE.Mesh(geometryFinger,materialleg);
    FingDx2.rotation.z = Math.PI/2 + 0.5;
    FingDx2.position.y = -0.20;
    FingDx2.position.x = 0.12;
    FingDx2.rotation.y = Math.PI;
    legDx.add(FingDx2);
    //*****Fingerdx22*****
    var FingDx22 = new THREE.Mesh(geometryMiniFinger,materialleg);
    FingDx22.rotation.z = -FingDx2.rotation.z;
    FingDx22.position.y = 0.1;
    FingDx22.position.x = -0.05;
    FingDx2.add(FingDx22);

    //*****Fingerdx3*****
    FingDx3 = new THREE.Mesh(geometryFinger,materialleg);
    FingDx3.rotation.z = Math.PI/2 + 0.5;
    FingDx3.position.y = -0.22;
    FingDx3.position.z = 0.12;
    FingDx3.position.x = 0.0;
    FingDx3.rotation.y = Math.PI/2;
    legDx.add(FingDx3);
    //*****Fingerdx33*****
    var FingDx33 = new THREE.Mesh(geometryMiniFinger,materialleg);
    FingDx33.rotation.z = -FingDx3.rotation.z;
    FingDx33.position.y = 0.1;
    FingDx33.position.x = -0.05;
    FingDx3.add(FingDx33);



    //**********************LEG        LEFT         *****
    var legradius = noseradius/3;
    legSx = new THREE.Mesh(geometryLeg,materialleg);
    legSx.position.y = -1;
    legSx.position.x = 0.05;
    legSx.position.z = -0.25;
    legSx.rotation.z = 0.064;
    legSx.rotation.y = Math.PI/2;
    body.add(legSx);

    //*****Fingersx1*****
    var FingSx1 = new THREE.Mesh(geometryFinger,materialleg);
    FingSx1.rotation.z = Math.PI/2 + 0.5;
    FingSx1.position.y = -0.20;
    FingSx1.position.x = -0.12;
    legSx.add(FingSx1);
    // //*****Fingerdx11*****
    var FingSx11 = new THREE.Mesh(geometryMiniFinger,materialleg);
    FingSx11.rotation.z = -FingSx1.rotation.z;
    FingSx11.position.y = 0.1;
    FingSx11.position.x = -0.05;
    FingSx1.add(FingSx11);
    // //*****Fingerdx2*****
    FingSx2 = new THREE.Mesh(geometryFinger,materialleg);
    FingSx2.rotation.z = Math.PI/2 + 0.5;
    FingSx2.position.y = -0.20;
    FingSx2.position.x = 0.12;
    FingSx2.rotation.y = Math.PI;
    legSx.add(FingSx2);
    // //*****Fingerdx22*****
    var FingSx22 = new THREE.Mesh(geometryMiniFinger,materialleg);
    FingSx22.rotation.z = -FingSx2.rotation.z;
    FingSx22.position.y = 0.1;
    FingSx22.position.x = -0.05;
    FingSx2.add(FingSx22);

    // //*****Fingerdx3*****
    FingSx3 = new THREE.Mesh(geometryFinger,materialleg);
    FingSx3.rotation.z = Math.PI/2 + 0.5;
    FingSx3.position.y = -0.22;
    FingSx3.position.z = 0.12;
    FingSx3.position.x = 0.0;
    FingSx3.rotation.y = Math.PI/2;
    legSx.add(FingSx3);
    //*****Fingerdx33*****
    var FingSx33 = new THREE.Mesh(geometryMiniFinger,materialleg);
    FingSx33.rotation.z = -FingSx3.rotation.z;
    FingSx33.position.y = 0.1;
    FingSx33.position.x = -0.05;
    FingSx3.add(FingSx33);






    //**********
    scene.add( body );
}