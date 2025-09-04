import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import * as THREE from "three";

type ModelProps = {
  url: string;
  onLoaded: (box: THREE.Box3) => void;
};

function Model({ url, onLoaded }: ModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      onLoaded(box);
    }
  }, [scene, onLoaded]);

  return <primitive object={scene} ref={meshRef} />;
}

export default function Product3DViewer() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  if (!productId) {
    toast.error("Invalid product ID");
    return <p className="text-center mt-20">Invalid product</p>;
  }

  const modelUrl = history.state?.usr?.modelUrl;
  if (!modelUrl) {
    return <p className="text-center mt-20">No 3D model available</p>;
  }

  const handleModelLoaded = (box: THREE.Box3) => {
    if (!controlsRef.current || !cameraRef.current) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = cameraRef.current.fov * (Math.PI / 180);
    const cameraZ = maxDim / (2 * Math.tan(fov / 2));

    cameraRef.current.position.set(center.x, center.y, cameraZ * 1.5);
    cameraRef.current.lookAt(center);

    controlsRef.current.target.copy(center);
    controlsRef.current.maxDistance = maxDim * 3;
    controlsRef.current.minDistance = maxDim * 0.5;

    cameraRef.current.near = maxDim / 100;
    cameraRef.current.far = maxDim * 10;
    cameraRef.current.updateProjectionMatrix();
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="p-4 flex items-center bg-gray-100 shadow">
        <div className="flex-1 flex items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-lg font-semibold">3D Model Viewer</h1>
        <div className="flex-1" />
      </div>

      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ camera }) => (cameraRef.current = camera as THREE.PerspectiveCamera)}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={1.5} />

          <Suspense
            fallback={
              <Html>
                <p className="text-center text-gray-700">Loading 3D model...</p>
              </Html>
            }
          >
            <Model url={modelUrl} onLoaded={handleModelLoaded} />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            enableRotate
          />
        </Canvas>
      </div>
    </div>
  );
}
