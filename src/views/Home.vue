<template>
    <section
        ref="canvas"
        style="width: 100%; height: 100%;"
    >

    </section>
</template>

<script>
import * as THREE from "three";
// const glsl = require("glslify");
export default {
    name: "Home",

    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            cube: null,
        };
    },

    methods: {
        setupInit() {
            //             console.log(
            //                 glsl(`
            //   #pragma glslify: noise = require('glsl-noise/simplex/3d')

            //   precision mediump float;
            //   varying vec3 vpos;
            //   void main () {
            //     gl_FragColor = vec4(noise(vpos*25.0),1);
            //   }
            // `)
            //             );
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.$refs.canvas.appendChild(this.renderer.domElement);
        },

        init() {
            this.setupInit();

            this.addCube();
            this.animate();
        },

        animate() {
            requestAnimationFrame(this.animate);

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
    },

    mounted() {
        this.init();
        this.animate();
    },
};
</script>