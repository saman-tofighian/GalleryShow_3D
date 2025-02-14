// Saman Tofighian
import * as three from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
const Sc = new three.Scene();
const draco = new DRACOLoader();
draco.setDecoderPath("/draco/");
const gltf = new GLTFLoader();
gltf.setDRACOLoader(draco);
let model = null;
gltf.load("/models/richards_art_gallery_-_audio_tour.glb", (gallery) => {
  model = gallery.scene;
  Sc.add(model);
});
const size = {
  width: innerWidth,
  height: innerHeight,
};
const camera = new three.PerspectiveCamera(75, size.width / size.height);
camera.position.set(0, 1, 0.2);
Sc.add(camera);
const aml = new three.AmbientLight("#fff", 1);
const hemi = new three.HemisphereLight("#fff", 2);
hemi.position.set(2, 2, 2);
Sc.add(aml, hemi);
const canvas = document.getElementById("web");
const renderer = new three.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(size.width, size.height);
renderer.toneMapping = three.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
const pointer = new PointerLockControls(camera, canvas);
let keyBoard = [];
window.addEventListener("keydown", (e) => {
  keyBoard[e.key] = true;
  if (e.keyCode == 13) {
    pointer.lock();
  }
});
window.addEventListener("keyup", (e) => {
  keyBoard[e.key] = false;
  if (e.keyCode == 11) {
    pointer.unlock();
  }
});
const bounds = {
  minX: -12.5, // حداقل مقدار محور X
  maxX: 16, // حداکثر مقدار محور X
  minZ: -9, // حداقل مقدار محور Z
  maxZ: 14, // حداکثر مقدار محور Z
};

const move = () => {
  // حرکت به جلو
  if (keyBoard["w"]) {
    pointer.moveForward(0.04);
  }
  // حرکت به عقب
  if (keyBoard["s"]) {
    pointer.moveForward(-0.04);
  }
  // حرکت به راست
  if (keyBoard["d"]) {
    pointer.moveRight(0.04);
  }
  // حرکت به چپ
  if (keyBoard["a"]) {
    pointer.moveRight(-0.04);
  }

  const position = camera.position;
  position.x = Math.max(bounds.minX, Math.min(bounds.maxX, position.x));
  position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, position.z));
};
const animation = () => {
  move();
  renderer.render(Sc, camera);
  requestAnimationFrame(animation);
};
animation();
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});
// Saman Tofighian
