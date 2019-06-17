function drawShip(){
    var woodmaterial = new THREE.MeshPhongMaterial( { color: 0xa0522d , specular: 0x826c6c, shininess: 0,flatShading:true} );
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        'pirateships.obj',
        // called when resource is loaded
        function ( ship ) {
            ship.rotation.y = -Math.PI/2 ;
            ship.position.x = 45;
            ship.position.z = 35;
            ship.position.y = 2;
            ship.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                    child.material= woodmaterial;
                }
            } );
            scene.add( ship );
            loaded = true;

        },
        // called when loading is in progresses
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );
}