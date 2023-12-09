import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
    import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Create icosahedron
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // Create tag cloud
    const tagCloud = createTagCloud();
    scene.add(tagCloud);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);

    // Font Loader
    const fontLoader = new THREE.FontLoader();

    // Load a font to be used in TextGeometry
    fontLoader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', (font) => {
        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Rotate icosahedron
            icosahedron.rotation.x += 0.005;
            icosahedron.rotation.y += 0.005;

            // Rotate tag cloud around icosahedron vertices
            updateTagCloudPosition();

            renderer.render(scene, camera);
        }

        function createTagCloud() {
            // Create a group to hold all tags
            const tagCloudGroup = new THREE.Group();

            // Your tag data
            const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];

            // Create a tag for each vertex of the icosahedron
            const positionAttribute = geometry.getAttribute('position');
            for (let i = 0; i < positionAttribute.count; i++) {
                const vertex = new THREE.Vector3();
                vertex.fromBufferAttribute(positionAttribute, i);

                const tagText = tags[i % tags.length];
                const tagGeometry = new THREE.TextGeometry(tagText, { font: font, size: 0.2, height: 0.05 });
                const tagMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                const tagMesh = new THREE.Mesh(tagGeometry, tagMaterial);
                tagMesh.position.copy(vertex);
                tagCloudGroup.add(tagMesh);
            }

            return tagCloudGroup;
        }

        function updateTagCloudPosition() {
            // Update the position of the tag cloud based on the icosahedron vertices
            const positionAttribute = geometry.getAttribute('position');
            for (let i = 0; i < positionAttribute.count; i++) {
                const vertex = new THREE.Vector3();
                vertex.fromBufferAttribute(positionAttribute, i);

                const tagMesh = tagCloud.children[i];
                tagMesh.position.copy(vertex).applyMatrix4(icosahedron.matrixWorld);
            }
        }

        animate();
    });