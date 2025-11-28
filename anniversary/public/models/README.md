# 3D Models (Optional)

This folder is for optional 3D model assets.

## Current Implementation:
The polaroids are created using simple geometric shapes (boxes) with React Three Fiber. They work perfectly without external models.

## If You Want to Use Custom 3D Models:

### Supported Formats:
- `.glb` (recommended)
- `.gltf`
- `.obj` (with materials)

### How to Add Custom Models:

1. Place your `.glb` or `.gltf` files in this folder
2. Update `src/components/FutureScene.jsx`:

```javascript
import { useGLTF } from '@react-three/drei';

function CustomPolaroid({ modelPath, position }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} />;
}
```

### Where to Find 3D Models:
- Sketchfab (https://sketchfab.com)
- TurboSquid (https://www.turbosquid.com)
- CGTrader (https://www.cgtrader.com)
- Free3D (https://free3d.com)

### Model Recommendations:
- Polaroid camera models
- Picture frame models
- Heart shapes
- Romantic decorations

### Tips:
- Keep file sizes under 5MB
- Optimize models before use
- Test performance on mobile
- Ensure proper scale and rotation
