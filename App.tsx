import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import React from "react";
import {
  Scene,
  Mesh,
  PerspectiveCamera,
  MeshBasicMaterial,
  BoxGeometry,
} from "three";

import { Renderer } from "expo-three";

const App: React.FC = () => {
  const _onGLContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: "blue" });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };
  return <GLView style={{ flex: 1 }} onContextCreate={_onGLContextCreate} />;
};

export default App;
