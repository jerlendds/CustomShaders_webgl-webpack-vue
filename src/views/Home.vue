<template>
    <section
        ref="canvas"
        style="width: 100%; height: 100vh;"
    >
        <script
            ref="vertexShader"
            id="vertexShader"
            type="x-shader/x-vertex"
        >

            #include <morphtarget_pars_vertex>

			void main()	{
			
				#include <begin_vertex>
				#include <morphtarget_vertex>

				gl_Position = vec4( transformed, 1.0 );

			}

</script>

        <script
            ref="fragmentShader"
            id="fragmentShader"
            type="x-shader/x-fragment"
        >

            void main()	{

				gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

			}

</script>
    </section>
</template>

<script>
import * as THREE from "three";

// import vertex from "../assets/glsl/gradient/vertex.js";
// import fragment from "../assets/glsl/gradient/fragment.js";

export default {
    name: "Home",

    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            cube: null,
            zoom: 4,
            width: 0,
            height: 0,
            fancyShader: null,
            timestamp: 0,
        };
    },

    mounted() {
        this.init();
        this.animate();
    },
    methods: {
        setupInit() {
            this.width = this.$refs.canvas.offsetWidth;
            this.height = this.$refs.canvas.offsetHeight;
            this.aspect = this.width / this.height;
            console.log(this.height, this.width);

            this.scene = new THREE.Scene();
            this.camera = new THREE.OrthographicCamera(
                (this.zoom * this.aspect) / -2,
                (this.zoom * this.aspect) / 2,
                this.zoom / 2,
                this.zoom / -2,
                1,
                1024
            );
            this.camera.position.set(0, 0, 8);
            this.camera.up.set(0, 0, 1);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            this.renderer = new THREE.WebGLRenderer({ alpha: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.$refs.canvas.appendChild(this.renderer.domElement);
        },

        init() {
            this.setupInit();
            this.adjustLighting();
            this.addCube();
            this.addCustomShader();
            this.animate();
        },

        animate() {
            requestAnimationFrame(this.animate);

            this.timestamp += 0.01;

            this.fancyShader.morphTargetInfluences[0] = Math.abs(
                Math.sin(this.timestamp)
            );

            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.02;

            this.renderer.render(this.scene, this.camera);
        },

        addCube() {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);

            this.camera.position.z = 5;
        },

        vertexShader() {
            const shader = this.$refs.vertexShader.textContent;
            console.log(shader);
            return String(shader);
        },
        fragmentShader() {
            const shader = this.$refs.fragmentShader.textContent;
            console.log(shader);
            return String(shader);
        },

        addCustomShader() {
            var geometry = new THREE.PlaneBufferGeometry();

            // generate morph targets

            var morphTargets = [];

            var morphTarget = geometry.attributes.position.clone();
            morphTarget.name = "morphTarget1";

            var v = new THREE.Vector3();

            for (var i = 0; i < morphTarget.count; i++) {
                v.fromBufferAttribute(morphTarget, i);
                v.multiplyScalar(2);
                morphTarget.setXYZ(i, v.x, v.y, v.z);
            }

            morphTargets.push(morphTarget);

            geometry.morphAttributes.position = morphTargets;

            //

            var material = new THREE.ShaderMaterial({
                vertexShader: this.vertexShader(),
                fragmentShader: this.fragmentShader(),
            });

            material.morphTargets = true;

            this.fancyShader = new THREE.Mesh(geometry, material);
            this.scene.add(this.fancyShader);
        },

        adjustLighting() {
            let pointLight = new THREE.PointLight(0xdddddd);
            pointLight.position.set(-5, -3, 3);
            this.scene.add(pointLight);

            let ambientLight = new THREE.AmbientLight(0x505050);
            this.scene.add(ambientLight);
        },
    },
};
</script>