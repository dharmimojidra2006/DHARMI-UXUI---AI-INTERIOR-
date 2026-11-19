import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return true;
  try {
    const testCanvas = document.createElement('canvas');
    const gl =
      (testCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (testCanvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function supportsHalfFloatFBO(renderer: THREE.WebGLRenderer): boolean {
  const gl = renderer.getContext();
  if (!gl) return false;
  if (renderer.capabilities.isWebGL2) {
    return Boolean(
      gl.getExtension('EXT_color_buffer_float') ||
        gl.getExtension('EXT_color_buffer_half_float')
    );
  }
  return Boolean(
    gl.getExtension('OES_texture_half_float') &&
      gl.getExtension('EXT_color_buffer_half_float')
  );
}

/**
 * Builds ONE expansive, continuous, edge-to-edge full-screen sculptural liquid-silk
 * waterfall manifold. Vertical u (0 -> 1) cascades smoothly top-to-bottom across
 * multi-tiered architectural plunge curves; horizontal v (0 -> 1) spans the full
 * viewport width with sweeping calligraphic S-drapes, overlapping silk pleats,
 * and deep sculpted valleys that catch glossy studio reflections.
 */
function createFullScreenSilkWaterfall(
  uSegments: number,
  vSegments: number
): THREE.BufferGeometry {
  const vertCount = (uSegments + 1) * (vSegments + 1);
  const positions = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);
  const indices: number[] = [];

  const totalHeight = 9.4; // Bleeds organically off top & bottom edges
  const totalWidth = 14.6; // Bleeds organically across full wide screens

  for (let i = 0; i <= uSegments; i++) {
    const u = i / uSegments; // 0 (top overhang) -> 1 (bottom pool)
    const yBase = (0.5 - u) * totalHeight;

    // Sweeping diagonal cascade curve so the silk flows gracefully corner-to-corner
    const diagSweep =
      Math.sin(u * Math.PI * 1.15 - 0.42) * 1.45 - (u - 0.5) * 1.65;

    // Three cascading waterfall terrace steps in depth Z
    const plungeZ =
      Math.cos(u * Math.PI * 1.85) * 0.52 +
      Math.sin(u * Math.PI * 3.1 - 0.5) * 0.28;

    for (let j = 0; j <= vSegments; j++) {
      const v = j / vSegments; // 0 (left) -> 1 (right)
      const s = v * 2.0 - 1.0; // -1..1

      // Deep sweeping diagonal silk pleats + organic folded flutes
      const primaryCascade =
        Math.sin(s * Math.PI * 2.35 + u * 3.6) * 0.62;
      const secondaryFlute =
        Math.cos(s * Math.PI * 4.4 - u * 4.9) * 0.26;
      const diagonalFold =
        Math.sin((s * 0.8 + u * 1.3) * Math.PI * 2.2) * 0.34;
      const subtleCurvature = Math.cos(s * Math.PI * 0.5) * 0.48;

      // Subtle lateral compression where folds bunch like heavy liquid silk
      const foldGatherX =
        Math.cos(s * Math.PI * 2.35 + u * 3.6) * 0.22 +
        Math.sin(s * Math.PI * 4.4 - u * 4.9) * 0.08;

      const x = s * (totalWidth * 0.5) + diagSweep * 0.55 + foldGatherX;
      const y = yBase + primaryCascade * 0.16;
      const z =
        plungeZ +
        subtleCurvature +
        primaryCascade +
        secondaryFlute +
        diagonalFold;

      const idx = i * (vSegments + 1) + j;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;

      uvs[idx * 2] = u;
      uvs[idx * 2 + 1] = v;
    }
  }

  for (let i = 0; i < uSegments; i++) {
    for (let j = 0; j < vSegments; j++) {
      const a = i * (vSegments + 1) + j;
      const b = (i + 1) * (vSegments + 1) + j;
      const c = (i + 1) * (vSegments + 1) + (j + 1);
      const d = i * (vSegments + 1) + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Architectural studio reflection environment tuned to Warm Beige, Royal Blue,
 * and Burgundy glossy specular ribbons across Light & Dark modes.
 */
function createSilkStudioEnvironment(
  renderer: THREE.WebGLRenderer
): THREE.Texture {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0xe9dfc9);

  const sphereGeo = new THREE.SphereGeometry(24, 24, 16);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xe3d7bf,
    side: THREE.BackSide,
  });
  envScene.add(new THREE.Mesh(sphereGeo, sphereMat));

  const panels: {
    pos: [number, number, number];
    lookAt: [number, number, number];
    size: [number, number];
    color: number;
  }[] = [
    // Luminous Warm Cream Overhead Softbox for long liquid specular ribbons
    { pos: [-4.5, 9.0, 7.0], lookAt: [0, 0, 0], size: [14.0, 6.0], color: 0xfefaf2 },
    // Warm Beige Right Gallery Wall
    { pos: [9.5, 2.0, 4.5], lookAt: [0, 0, 0], size: [8.0, 12.0], color: 0xf4ecde },
    // Soft Burgundy Lower Reflection Bounce for fold warmth
    { pos: [4.5, -6.5, 3.0], lookAt: [0, 0, 0], size: [11.0, 6.0], color: 0xb95f76 },
    // Royal Blue Back Architectural Rim Strip
    { pos: [-8.5, -1.0, -6.0], lookAt: [0, 0, 0], size: [9.0, 11.0], color: 0x5172c7 },
    // Quiet Warm Lower Floor Fill
    { pos: [0.0, -9.5, 2.0], lookAt: [0, 0, 0], size: [14.0, 8.0], color: 0xd9cbb1 },
  ];

  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];

  panels.forEach((p) => {
    const geo = new THREE.PlaneGeometry(p.size[0], p.size[1]);
    const mat = new THREE.MeshBasicMaterial({
      color: p.color,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...p.pos);
    mesh.lookAt(...p.lookAt);
    envScene.add(mesh);
    geos.push(geo);
    mats.push(mat);
  });

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const target = pmrem.fromScene(envScene, 0.04);

  sphereGeo.dispose();
  sphereMat.dispose();
  geos.forEach((g) => g.dispose());
  mats.forEach((m) => m.dispose());
  pmrem.dispose();

  return target.texture;
}

interface WaterfallSilkUniforms {
  uTime: { value: number };
  uFlowPhase: { value: number };
  uMorphPhase: { value: number };
  uTransitionImpulse: { value: number };
  uIntroVeil: { value: number };
  uIntroPhase: { value: number };
  uScroll: { value: number };
  uFade: { value: number };
  uFluidMap: { value: THREE.Texture | null };
  uHasFluidMap: { value: number };
  uCursor: { value: THREE.Vector2 };
  uCursorVel: { value: THREE.Vector2 };
  uDragOffset: { value: THREE.Vector2 };
  uDragActive: { value: number };
  uDarkMode: { value: number };
}

function applyWaterfallSilkShader(
  material: THREE.MeshPhysicalMaterial,
  uniforms: WaterfallSilkUniforms
) {
  material.customProgramCacheKey = () => 'fullscreen-waterfall-silk-v2';
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uFlowPhase = uniforms.uFlowPhase;
    shader.uniforms.uMorphPhase = uniforms.uMorphPhase;
    shader.uniforms.uTransitionImpulse = uniforms.uTransitionImpulse;
    shader.uniforms.uIntroVeil = uniforms.uIntroVeil;
    shader.uniforms.uIntroPhase = uniforms.uIntroPhase;
    shader.uniforms.uScroll = uniforms.uScroll;
    shader.uniforms.uFade = uniforms.uFade;
    shader.uniforms.uFluidMap = uniforms.uFluidMap;
    shader.uniforms.uHasFluidMap = uniforms.uHasFluidMap;
    shader.uniforms.uCursor = uniforms.uCursor;
    shader.uniforms.uCursorVel = uniforms.uCursorVel;
    shader.uniforms.uDragOffset = uniforms.uDragOffset;
    shader.uniforms.uDragActive = uniforms.uDragActive;
    shader.uniforms.uDarkMode = uniforms.uDarkMode;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        uniform float uFlowPhase;
        uniform float uMorphPhase;
        uniform float uTransitionImpulse;
        uniform float uIntroVeil;
        uniform float uIntroPhase;
        uniform float uScroll;
        uniform sampler2D uFluidMap;
        uniform float uHasFluidMap;
        uniform vec2 uCursor;
        uniform vec2 uCursorVel;
        uniform vec2 uDragOffset;
        uniform float uDragActive;

        varying vec2 vSilkUv;
        varying vec4 vScreenClip;
        varying float vFoldCrest;
        varying float vPleatBand;
        varying float vCascadeWave;
        varying float vCursorWake;

        vec3 computeWaterfallSilkMotion(
          vec3 p,
          vec2 uvCoord,
          vec2 scrUv,
          out float crest,
          out float pleatFactor,
          out float cascadeWave,
          out float wakeAmt
        ) {
          float flow = uFlowPhase;
          float morph = uMorphPhase;
          float impulse = clamp(uTransitionImpulse, -1.6, 1.6);
          float absImpulse = abs(impulse);
          float scrollDrive = uScroll * 1.45;

          // 1. Continuous downward/diagonal waterfall silk waves + dual-state organic morphing
          float cascadeA = sin(uvCoord.x * 7.2 - flow * 1.35 + uvCoord.y * 4.1 + scrollDrive);
          float cascadeB = cos(uvCoord.y * 8.4 + flow * 0.92 - uvCoord.x * 4.6 - scrollDrive * 0.65);

          // Organic morph target blending smoothly between harmonic states as transitions advance
          float morphBlend = 0.5 + 0.5 * sin(morph);
          float morphFoldA = sin(uvCoord.y * 10.5 - uvCoord.x * 5.2 + flow * 1.1) * 0.42;
          float morphFoldB = cos((uvCoord.y + uvCoord.x * 0.65) * 14.0 - flow * 1.5) * 0.36;
          float morphedSilk = mix(morphFoldA, morphFoldB, morphBlend);

          // 2. Forward/backward transition stretch, bend & traveling ripple surge
          float midArc = sin(uvCoord.x * 3.14159265);
          float stretchFactor = 1.0 + absImpulse * 0.14;
          float stretchedY = p.y * (stretchFactor - 1.0) - impulse * midArc * 0.58;
          float lateralPinchX = -p.x * absImpulse * 0.055 + impulse * sin(uvCoord.x * 4.2 + morph) * 0.68;
          float transitionBendZ = impulse * midArc * 0.85 * cos((uvCoord.y - 0.5) * 2.6);
          float transitionRipple =
            sin(uvCoord.x * 16.5 - flow * 4.4 + uvCoord.y * 5.0) *
            absImpulse *
            0.24 *
            (0.45 + 0.55 * midArc);

          // Fine liquid-silk micro-ripples sliding down folds
          float microSilk = sin(uvCoord.x * 13.5 + uvCoord.y * 9.0 - uTime * 1.55) * 0.13;

          vec3 disp = vec3(
            (cascadeB * 0.28 + morphedSilk * 0.32 + lateralPinchX),
            (cascadeA * 0.22 + stretchedY - uScroll * 0.42),
            (cascadeA * 0.46 + cascadeB * 0.36 + morphedSilk * 0.55 + microSilk + transitionBendZ + transitionRipple)
          );

          // 2b. Opening exhibition choreography: graceful helical twist & deep central fold waves
          float introTwist = uIntroVeil * (
            sin(uvCoord.x * 3.14159265 - uIntroPhase * 0.92) * 0.62 +
            (uvCoord.y - 0.5) * 0.85 * cos(uIntroPhase * 0.7)
          );
          float introFold = sin(uvCoord.x * 8.8 - uIntroPhase * 2.1 + uvCoord.y * 4.6) * 0.68 * uIntroVeil;
          if (uIntroVeil > 0.001) {
            float twistAngle = introTwist * (0.4 + 0.6 * midArc) * 0.44;
            float cosT = cos(twistAngle);
            float sinT = sin(twistAngle);
            vec3 worldBase = p + disp;
            float rotX = worldBase.x * cosT - worldBase.z * sinT;
            float rotZ = worldBase.x * sinT + worldBase.z * cosT;
            disp.x += (rotX - worldBase.x) * 0.65;
            disp.z += (rotZ - worldBase.z) * 0.65 + uIntroVeil * (0.85 * midArc + introFold);
            disp.y += cos(uvCoord.y * 5.2 - uIntroPhase * 1.3) * 0.35 * uIntroVeil * midArc;
          }

          // 3. Subtle GPU FBO cursor ripple & click-drag elastic sculpting
          float fboRipple = 0.0;
          vec2 fboStretch = vec2(0.0);
          if (uHasFluidMap > 0.5) {
            vec4 fluidSample = texture2D(uFluidMap, clamp(scrUv, 0.002, 0.998));
            fboRipple = clamp(fluidSample.r, -1.6, 1.6);
            fboStretch = clamp(fluidSample.ba, -1.4, 1.4);
          }

          vec2 cursorDelta = scrUv - uCursor;
          float cursorDist = length(cursorDelta);
          float cursorMask = exp(-cursorDist * cursorDist * 14.0);
          float radialWave = sin(cursorDist * 30.0 - uTime * 5.2) * exp(-cursorDist * 4.5) * length(uCursorVel) * 0.22;

          disp.x += fboStretch.x * 0.34 + uCursorVel.x * cursorMask * 0.16 + uDragOffset.x * (0.28 + 0.72 * cursorMask);
          disp.y += fboStretch.y * 0.34 + uCursorVel.y * cursorMask * 0.16 + uDragOffset.y * (0.28 + 0.72 * cursorMask);
          disp.z += fboRipple * 0.38 + radialWave;

          crest = cascadeA * 0.48 + cascadeB * 0.38 + morphedSilk * 0.65 + introFold * 0.65 + fboRipple * 1.1;
          pleatFactor = sin(uvCoord.y * 13.5 + uvCoord.x * 4.8 + cascadeA * 0.75 + morph * 0.6 + uIntroPhase * 0.45 * uIntroVeil);
          cascadeWave = 0.5 + 0.5 * sin(uvCoord.x * 6.28318 - flow * 1.1 + uvCoord.y * 3.14159);
          wakeAmt = clamp(
            abs(fboRipple) * 0.8 + length(fboStretch) * 0.75 + absImpulse * 0.65 + uIntroVeil * 0.35 + cursorMask * (length(uCursorVel) + uDragActive),
            0.0,
            1.6
          );
          return disp;
        }
        `
      )
      .replace(
        '#include <beginnormal_vertex>',
        `
        #include <beginnormal_vertex>
        vec4 baseMvPos = modelViewMatrix * vec4(position, 1.0);
        vec4 baseClipPos = projectionMatrix * baseMvPos;
        vec2 baseScrUv = baseClipPos.xy / max(baseClipPos.w, 0.001) * 0.5 + 0.5;

        vec3 refAxis = abs(objectNormal.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 tanA = normalize(cross(refAxis, objectNormal));
        vec3 tanB = cross(objectNormal, tanA);
        float eps = 0.032;

        float crestC = 0.0;
        float pleatC = 0.0;
        float cascadeC = 0.0;
        float wakeC = 0.0;
        float dCrest = 0.0;
        float dPleat = 0.0;
        float dCascade = 0.0;
        float dWake = 0.0;

        vec3 pC = position + computeWaterfallSilkMotion(position, uv, baseScrUv, crestC, pleatC, cascadeC, wakeC);
        vec3 pA = (position + tanA * eps) + computeWaterfallSilkMotion(position + tanA * eps, uv + vec2(0.007, 0.0), baseScrUv + vec2(0.004, 0.0), dCrest, dPleat, dCascade, dWake);
        vec3 pB = (position + tanB * eps) + computeWaterfallSilkMotion(position + tanB * eps, uv + vec2(0.0, 0.007), baseScrUv + vec2(0.0, 0.004), dCrest, dPleat, dCascade, dWake);

        vec3 computedNorm = cross(pA - pC, pB - pC);
        if (length(computedNorm) > 0.0001) {
          objectNormal = normalize(computedNorm);
        }
        `
      )
      .replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vSilkUv = uv;
        vFoldCrest = crestC;
        vPleatBand = pleatC;
        vCascadeWave = cascadeC;
        vCursorWake = wakeC;
        transformed = pC;
        `
      )
      .replace(
        '#include <project_vertex>',
        `
        #include <project_vertex>
        vScreenClip = gl_Position;
        `
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `
        #include <common>
        uniform float uFade;
        uniform float uDarkMode;
        uniform float uTime;
        uniform float uTransitionImpulse;
        uniform float uIntroVeil;

        varying vec2 vSilkUv;
        varying vec4 vScreenClip;
        varying float vFoldCrest;
        varying float vPleatBand;
        varying float vCascadeWave;
        varying float vCursorWake;
        `
      )
      .replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        // Editorial cover palette:
        // Light Mode: Royal Blue (#263D78/#1C2D58) · Burgundy (#802C43/#A04A60) · Warm Beige (#E9DFC9/#F3EBDD)
        // Dark Mode: Midnight Indigo (#1A2D5E/#3A5AAD) · Rose Burgundy (#9E3B55/#C45D77) · Champagne Ivory (#EFE6D5)
        vec3 royalValley = mix(vec3(0.110, 0.176, 0.345), vec3(0.102, 0.176, 0.369), uDarkMode);
        vec3 royalMid = mix(vec3(0.149, 0.239, 0.471), vec3(0.227, 0.353, 0.678), uDarkMode);
        vec3 burgundySilk = mix(vec3(0.502, 0.173, 0.263), vec3(0.769, 0.365, 0.467), uDarkMode);
        vec3 softBurgundy = mix(vec3(0.627, 0.290, 0.376), vec3(0.898, 0.596, 0.675), uDarkMode);
        vec3 warmCreamSilk = mix(vec3(0.953, 0.922, 0.867), vec3(0.937, 0.902, 0.835), uDarkMode);
        vec3 warmBeigeBase = mix(vec3(0.914, 0.875, 0.788), vec3(0.086, 0.125, 0.227), uDarkMode);

        float pleatMix = smoothstep(-0.85, 0.85, vPleatBand);
        float crestMix = smoothstep(-0.75, 0.88, vFoldCrest);
        float cascadeRibbon = smoothstep(0.18, 0.88, vCascadeWave);

        // Sweeping diagonal fluid currents blending Royal Blue, Burgundy & Warm Beige
        vec3 silkColor = mix(royalValley, royalMid, pleatMix * 0.75 + crestMix * 0.25);
        float burgundyCurrent = smoothstep(0.22, 0.84, cascadeRibbon * 0.7 + crestMix * 0.35);
        silkColor = mix(silkColor, mix(burgundySilk, softBurgundy, crestMix * 0.55), clamp(burgundyCurrent * 0.72 + vCursorWake * 0.22, 0.0, 0.82));

        // Glossy Warm Beige silk highlights along upper waterfall ridges
        float beigeCrest = smoothstep(0.48, 0.95, crestMix * 0.7 + (1.0 - pleatMix) * 0.32);
        silkColor = mix(silkColor, warmCreamSilk, beigeCrest * 0.54);

        // Compute normalized screen coordinates for typography contrast preservation
        vec2 scrUv = (vScreenClip.xy / max(vScreenClip.w, 0.001)) * 0.5 + 0.5;
        vec2 centerOffset = (scrUv - vec2(0.5, 0.49)) / vec2(0.35, 0.27);
        float radialCenter = length(centerOffset);
        // During opening exhibition intro (uIntroVeil -> 1), bold silk spans cleanly across center
        float readingVeilMask = (1.0 - smoothstep(0.32, 1.38, radialCenter)) * (1.0 - uIntroVeil * 0.88);

        // Keep center behind cover typography gossamer & airy when settled
        vec3 readingTint = mix(warmCreamSilk, vec3(0.105, 0.149, 0.265), uDarkMode);
        diffuseColor.rgb = mix(silkColor, mix(warmBeigeBase, readingTint, 0.45), readingVeilMask * 0.78);

        // Translucent liquid-silk alpha: full sculptural density in intro -> gossamer veil on settled cover
        float baseTranslucency = mix(0.46, 0.84, clamp(crestMix * 0.6 + pleatMix * 0.4, 0.0, 1.0));
        float outerBoost = smoothstep(0.65, 1.55, radialCenter);
        float alpha = mix(baseTranslucency * (0.68 + 0.32 * outerBoost), 0.16 + 0.08 * crestMix, readingVeilMask);
        alpha = mix(alpha, max(alpha, 0.82), uIntroVeil * 0.72);

        diffuseColor.a = clamp(alpha, 0.0, 0.92) * uFade;
        `
      )
      .replace(
        '#include <emissivemap_fragment>',
        `
        #include <emissivemap_fragment>
        // Subsurface translucent silk rim luminescence along grazing fold crests
        vec3 vDir = normalize(vViewPosition);
        float fresnelSilk = pow(1.0 - clamp(abs(dot(normal, vDir)), 0.0, 1.0), 2.35);

        vec2 emissiveScrUv = (vScreenClip.xy / max(vScreenClip.w, 0.001)) * 0.5 + 0.5;
        float emissiveCenterDist = length((emissiveScrUv - vec2(0.5, 0.49)) / vec2(0.35, 0.27));
        float outerSilkGlow = max(smoothstep(0.4, 1.35, emissiveCenterDist), uIntroVeil * 0.65);

        vec3 sheenTint = mix(
          mix(vec3(0.627, 0.290, 0.376), vec3(0.953, 0.922, 0.867), clamp(vFoldCrest * 0.5 + 0.5, 0.0, 1.0)),
          mix(vec3(0.769, 0.365, 0.467), vec3(0.360, 0.520, 0.860), clamp(vCascadeWave, 0.0, 1.0)),
          uDarkMode
        );
        float impulseGlow = 1.0 + abs(uTransitionImpulse) * 0.28 + uIntroVeil * 0.2;
        totalEmissiveRadiance += sheenTint * fresnelSilk * (0.22 + 0.16 * uDarkMode) * outerSilkGlow * impulseGlow * uFade;
        `
      );
  };
}

const _raycaster = new THREE.Raycaster();
const _ndc = new THREE.Vector2();

interface OrganicStageProps {
  introStage?: 'active' | 'revealing' | 'done';
}

export const OrganicSculptureStage: React.FC<OrganicStageProps> = ({
  introStage = 'done',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const introStageRef = useRef(introStage);

  useEffect(() => {
    introStageRef.current = introStage;
  }, [introStage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(canvas);

    const handleContextLost = (e: Event) => e.preventDefault();
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    // -------------------------------------------------------------------------
    // 1. GPU Ping-Pong FBO Fluid Ripple Simulation (Full Screen)
    // -------------------------------------------------------------------------
    const canUseFbo = supportsHalfFloatFBO(renderer) && !reducedMotion;
    const simSize = isSoftwareGl ? 96 : 168;
    const fboOptions: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    let rtA: THREE.WebGLRenderTarget | null = null;
    let rtB: THREE.WebGLRenderTarget | null = null;
    let simScene: THREE.Scene | null = null;
    let simCamera: THREE.OrthographicCamera | null = null;
    let simMaterial: THREE.ShaderMaterial | null = null;
    let simQuadGeo: THREE.PlaneGeometry | null = null;

    if (canUseFbo) {
      rtA = new THREE.WebGLRenderTarget(simSize, simSize, fboOptions);
      rtB = new THREE.WebGLRenderTarget(simSize, simSize, fboOptions);

      simScene = new THREE.Scene();
      simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      simQuadGeo = new THREE.PlaneGeometry(2, 2);

      simMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uPrevState: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / simSize, 1 / simSize) },
          uBrushPos: { value: new THREE.Vector2(0.5, 0.5) },
          uBrushVel: { value: new THREE.Vector2(0, 0) },
          uBrushPower: { value: 0 },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uPrevState;
          uniform vec2 uTexelSize;
          uniform vec2 uBrushPos;
          uniform vec2 uBrushVel;
          uniform float uBrushPower;
          uniform float uTime;

          varying vec2 vUv;

          void main() {
            vec4 state = texture2D(uPrevState, vUv);
            float h = state.r;
            float vel = state.g;
            vec2 wake = state.ba;

            float n = texture2D(uPrevState, vUv + vec2(0.0, uTexelSize.y)).r;
            float s = texture2D(uPrevState, vUv - vec2(0.0, uTexelSize.y)).r;
            float e = texture2D(uPrevState, vUv + vec2(uTexelSize.x, 0.0)).r;
            float w = texture2D(uPrevState, vUv - vec2(uTexelSize.x, 0.0)).r;

            float avg = (n + s + e + w) * 0.25;
            float accel = (avg - h) * 1.42 - vel * 0.048;
            vel = (vel + accel) * 0.976;
            h = (h + vel * 0.42) * 0.988;

            wake = wake * 0.94;

            float d = length(vUv - uBrushPos);
            float radius = mix(0.11, 0.065, clamp(uBrushPower, 0.0, 1.0));
            float kernel = exp(-(d * d) / (radius * radius));

            float rippleExcite = sin(d * 44.0 - uTime * 7.8) * 0.55 + 0.45;
            vel += kernel * uBrushPower * rippleExcite * 0.26;
            h -= kernel * uBrushPower * 0.11;
            wake += kernel * uBrushVel * 0.48;

            gl_FragColor = vec4(
              clamp(h, -1.8, 1.8),
              clamp(vel, -1.8, 1.8),
              clamp(wake.x, -1.5, 1.5),
              clamp(wake.y, -1.5, 1.5)
            );
          }
        `,
        depthTest: false,
        depthWrite: false,
      });

      simScene.add(new THREE.Mesh(simQuadGeo, simMaterial));
    }

    // -------------------------------------------------------------------------
    // 2. Full-Screen Continuous Liquid-Silk Waterfall Scene
    // -------------------------------------------------------------------------
    const scene = new THREE.Scene();
    const envTexture = createSilkStudioEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 60);
    camera.position.set(0, 0, 9.2);
    camera.lookAt(0, 0, 0);

    const hemi = new THREE.HemisphereLight(0xf6efe1, 0x263d78, 1.05);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfefaf2, 1.9);
    keyLight.position.set(-4.8, 7.0, 6.2);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 24;
    const sd = 8.0;
    keyLight.shadow.camera.left = -sd;
    keyLight.shadow.camera.right = sd;
    keyLight.shadow.camera.top = sd;
    keyLight.shadow.camera.bottom = -sd;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.025;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd9e3ff, 1.42);
    rimLight.position.set(6.2, 2.8, -4.2);
    scene.add(rimLight);

    const accentBounce = new THREE.DirectionalLight(0xc46b82, 0.88);
    accentBounce.position.set(3.8, -5.2, 4.0);
    scene.add(accentBounce);

    const waterfallGroup = new THREE.Group();
    scene.add(waterfallGroup);

    const silkCluster = new THREE.Group();
    waterfallGroup.add(silkCluster);

    const detectDarkTheme = () =>
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark';

    const sharedUniforms: WaterfallSilkUniforms = {
      uTime: { value: 0 },
      uFlowPhase: { value: 0 },
      uMorphPhase: { value: 0 },
      uTransitionImpulse: { value: 0 },
      uIntroVeil: { value: introStageRef.current === 'active' ? 1.0 : 0.0 },
      uIntroPhase: { value: 0 },
      uScroll: { value: 0 },
      uFade: { value: 1 },
      uFluidMap: { value: rtA ? rtA.texture : null },
      uHasFluidMap: { value: canUseFbo ? 1.0 : 0.0 },
      uCursor: { value: new THREE.Vector2(0.5, 0.5) },
      uCursorVel: { value: new THREE.Vector2(0, 0) },
      uDragOffset: { value: new THREE.Vector2(0, 0) },
      uDragActive: { value: 0 },
      uDarkMode: { value: detectDarkTheme() ? 1.0 : 0.0 },
    };

    const syncThemeLighting = (isDark: boolean) => {
      sharedUniforms.uDarkMode.value = isDark ? 1.0 : 0.0;
      hemi.intensity = isDark ? 0.92 : 1.05;
      keyLight.intensity = isDark ? 2.15 : 1.9;
      rimLight.intensity = isDark ? 1.78 : 1.42;
      accentBounce.intensity = isDark ? 1.1 : 0.88;
      renderer.toneMappingExposure = isDark ? 1.16 : 1.08;
    };

    syncThemeLighting(detectDarkTheme());

    const themeObserver = new MutationObserver(() => {
      syncThemeLighting(detectDarkTheme());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    // Glossy, translucent liquid-silk physical material
    const waterfallSilkMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.04,
      roughness: 0.14,
      clearcoat: 0.96,
      clearcoatRoughness: 0.07,
      sheen: 0.92,
      sheenColor: new THREE.Color(0xf9f4ea),
      sheenRoughness: 0.22,
      iridescence: 0.34,
      iridescenceIOR: 1.33,
      iridescenceThicknessRange: [140, 390],
      envMapIntensity: 1.32,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,
      opacity: 1.0,
    });
    applyWaterfallSilkShader(waterfallSilkMat, sharedUniforms);

    const uSegs = isSoftwareGl ? 104 : 168;
    const vSegs = isSoftwareGl ? 64 : 112;
    const silkGeo = createFullScreenSilkWaterfall(uSegs, vSegs);
    const silkMesh = new THREE.Mesh(silkGeo, waterfallSilkMat);
    silkMesh.castShadow = !isSoftwareGl;
    silkMesh.receiveShadow = true;
    silkCluster.add(silkMesh);

    const silkMeshes = [silkMesh];

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // -------------------------------------------------------------------------
    // 3. Cover Carousel / Scroll / Directional Transition Sync + Cursor Interaction
    // -------------------------------------------------------------------------
    let pointerScreenX = 0.5;
    let pointerScreenY = 0.5;
    let prevPointerScreenX = 0.5;
    let prevPointerScreenY = 0.5;
    let pointerSpeedEnergy = 0;
    let cursorVelX = 0;
    let cursorVelY = 0;

    let isDragging = false;
    let isOverFluid = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragTargetX = 0;
    let dragTargetY = 0;
    let dragCurrentX = 0;
    let dragCurrentY = 0;

    // Forward/backward transition dynamics synced to carousel, wheel, scroll, touch & keys
    let targetTransitionImpulse = 0;
    let currentTransitionImpulse = 0;
    let currentIntroVeil = introStageRef.current === 'active' ? 1.0 : 0.0;
    let introPhase = 0;
    let flowPhase = 0;
    let morphPhase = 0;
    let lastScrollY = window.scrollY;
    let touchStartY = 0;
    let touchStartX = 0;

    const triggerDirectionalTransition = (direction: number, strength = 1.0) => {
      if (reducedMotion || !direction) return;
      const clamped = THREE.MathUtils.clamp(direction * strength, -1.5, 1.5);
      targetTransitionImpulse = THREE.MathUtils.clamp(
        targetTransitionImpulse + clamped,
        -1.6,
        1.6
      );
    };

    const emitFluidCursorState = (over: boolean, dragging: boolean) => {
      const hasCustom =
        document.documentElement.classList.contains('has-custom-cursor');
      if (!hasCustom) {
        document.body.style.cursor = dragging ? 'grabbing' : over ? 'grab' : '';
      } else {
        document.body.style.cursor = '';
      }
      window.dispatchEvent(
        new CustomEvent('fluid-sculpture-hover', {
          detail: { over, dragging },
        })
      );
    };

    const checkOverInteractiveSilkPerimeter = (
      clientX: number,
      clientY: number
    ) => {
      const targetEl = document.elementFromPoint(clientX, clientY);
      if (
        targetEl &&
        targetEl.closest(
          'button, a, input, textarea, select, [role="button"], [role="dialog"], [data-cursor="project"], img, h1, p'
        )
      ) {
        if (isOverFluid) {
          isOverFluid = false;
          if (!isDragging) emitFluidCursorState(false, false);
        }
        return false;
      }

      const ndcX = (clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ndcY = -(clientY / Math.max(1, window.innerHeight)) * 2 + 1;

      // Preserve clean reading cursor over the central typography lockup
      const inCenterLockupBand =
        Math.abs(ndcX) < 0.36 && Math.abs(ndcY) < 0.3;
      if (inCenterLockupBand) {
        if (isOverFluid) {
          isOverFluid = false;
          if (!isDragging) emitFluidCursorState(false, false);
        }
        return false;
      }

      _ndc.set(ndcX, ndcY);
      _raycaster.setFromCamera(_ndc, camera);
      const hits = _raycaster.intersectObjects(silkMeshes, false);
      const hit = hits.length > 0 && sharedUniforms.uFade.value > 0.25;
      if (hit !== isOverFluid) {
        isOverFluid = hit;
        if (!isDragging) {
          emitFluidCursorState(hit, false);
        }
      }
      return hit;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const sx = THREE.MathUtils.clamp(
        e.clientX / Math.max(1, window.innerWidth),
        0,
        1
      );
      const sy = THREE.MathUtils.clamp(
        1.0 - e.clientY / Math.max(1, window.innerHeight),
        0,
        1
      );

      const dx = sx - prevPointerScreenX;
      const dy = sy - prevPointerScreenY;
      prevPointerScreenX = pointerScreenX;
      prevPointerScreenY = pointerScreenY;
      pointerScreenX = sx;
      pointerScreenY = sy;

      const speed = Math.hypot(dx, dy);
      if (!reducedMotion) {
        pointerSpeedEnergy = Math.min(1.2, pointerSpeedEnergy + speed * 22.0);
        cursorVelX = THREE.MathUtils.clamp(dx * 20.0, -1.1, 1.1);
        cursorVelY = THREE.MathUtils.clamp(dy * 20.0, -1.1, 1.1);
      }

      if (isDragging) {
        dragTargetX = THREE.MathUtils.clamp(
          ((e.clientX - dragStartX) / Math.max(1, window.innerWidth)) * 3.0,
          -1.2,
          1.2
        );
        dragTargetY = THREE.MathUtils.clamp(
          -((e.clientY - dragStartY) / Math.max(1, window.innerHeight)) * 3.0,
          -1.2,
          1.2
        );
        pointerSpeedEnergy = Math.max(pointerSpeedEnergy, 0.85);
        return;
      }

      checkOverInteractiveSilkPerimeter(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'button, a, input, textarea, select, [role="button"], [role="dialog"], [data-cursor="project"]'
        )
      ) {
        return;
      }
      if (checkOverInteractiveSilkPerimeter(e.clientX, e.clientY)) {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        emitFluidCursorState(true, true);
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;
        dragTargetX = 0;
        dragTargetY = 0;
        emitFluidCursorState(isOverFluid, false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const dominant =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominant) > 2) {
        const dir = dominant > 0 ? 1 : -1;
        const mag = THREE.MathUtils.clamp(Math.abs(dominant) / 110, 0.14, 0.65);
        triggerDirectionalTransition(dir, mag);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown'
      ) {
        triggerDirectionalTransition(1, 0.9);
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp'
      ) {
        triggerDirectionalTransition(-1, 0.9);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
      } else if (e.touches.length === 1) {
        const dx = touchStartX - e.touches[0].clientX;
        const dy = touchStartY - e.touches[0].clientY;
        const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        if (Math.abs(dominant) > 6) {
          triggerDirectionalTransition(
            dominant > 0 ? 1 : -1,
            THREE.MathUtils.clamp(Math.abs(dominant) / 140, 0.1, 0.5)
          );
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }
    };

    // Listen to cover or exhibition carousel transition events (forward / backward)
    const handleCarouselTransition = (e: Event) => {
      const detail = (
        e as CustomEvent<{ direction?: number; step?: number; index?: number }>
      ).detail;
      const dir =
        typeof detail?.direction === 'number'
          ? detail.direction
          : typeof detail?.step === 'number'
            ? detail.step
            : 1;
      triggerDirectionalTransition(dir >= 0 ? 1 : -1, 1.15);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener(
      'portfolio-carousel-transition',
      handleCarouselTransition
    );
    window.addEventListener('carousel-transition', handleCarouselTransition);

    const handleResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let smoothScrollY = window.scrollY;
    let frameId = 0;
    let isDisposed = false;
    let lastTime = performance.now();
    let elapsed = 0;
    let pingPong = true;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync
        ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)
        : null;
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state =
          sync && gl.getSyncParameter
            ? gl.getSyncParameter(sync, gl.SYNC_STATUS)
            : gl.SIGNALED;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync && gl.deleteSync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (isDisposed) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      const vw = window.innerWidth;
      const vh = Math.max(window.innerHeight, 600);
      const aspect = vw / vh;

      // Capture vertical scroll velocity as directional transition impulse
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      if (Math.abs(scrollDelta) > 0.5) {
        triggerDirectionalTransition(
          scrollDelta > 0 ? 1 : -1,
          THREE.MathUtils.clamp(Math.abs(scrollDelta) / 90, 0.05, 0.45)
        );
      }

      pointerSpeedEnergy = THREE.MathUtils.damp(pointerSpeedEnergy, 0, 4.8, dt);
      cursorVelX = THREE.MathUtils.damp(cursorVelX, 0, 5.8, dt);
      cursorVelY = THREE.MathUtils.damp(cursorVelY, 0, 5.8, dt);
      dragCurrentX = THREE.MathUtils.damp(
        dragCurrentX,
        isDragging ? dragTargetX : 0,
        isDragging ? 10.5 : 3.2,
        dt
      );
      dragCurrentY = THREE.MathUtils.damp(
        dragCurrentY,
        isDragging ? dragTargetY : 0,
        isDragging ? 10.5 : 3.2,
        dt
      );

      // Spring-damped forward/backward transition momentum
      targetTransitionImpulse = THREE.MathUtils.damp(
        targetTransitionImpulse,
        0,
        3.2,
        dt
      );
      currentTransitionImpulse = THREE.MathUtils.damp(
        currentTransitionImpulse,
        targetTransitionImpulse,
        6.4,
        dt
      );

      const activeIntroStage = introStageRef.current;
      const introTarget = activeIntroStage === 'active' ? 1.0 : 0.0;
      currentIntroVeil = THREE.MathUtils.damp(
        currentIntroVeil,
        introTarget,
        activeIntroStage === 'done' ? 5.2 : 2.6,
        dt
      );

      if (!reducedMotion) {
        if (currentIntroVeil > 0.01) {
          introPhase += dt * 1.18;
        }
        // Gentle perpetual silk waterfall descent + forward/backward directional surge
        const introSpeedBoost = currentIntroVeil * 0.48;
        flowPhase += dt * (0.34 + introSpeedBoost + currentTransitionImpulse * 1.45);
        morphPhase += dt * (0.24 + currentIntroVeil * 0.36 + Math.abs(currentTransitionImpulse) * 0.92);
      }

      if (canUseFbo && simMaterial && simScene && simCamera && rtA && rtB) {
        const readTarget = pingPong ? rtA : rtB;
        const writeTarget = pingPong ? rtB : rtA;

        simMaterial.uniforms.uPrevState.value = readTarget.texture;
        simMaterial.uniforms.uBrushPos.value.set(pointerScreenX, pointerScreenY);
        simMaterial.uniforms.uBrushVel.value.set(cursorVelX, cursorVelY);
        simMaterial.uniforms.uBrushPower.value = pointerSpeedEnergy;
        simMaterial.uniforms.uTime.value = elapsed;

        renderer.setRenderTarget(writeTarget);
        renderer.render(simScene, simCamera);
        renderer.setRenderTarget(null);

        sharedUniforms.uFluidMap.value = writeTarget.texture;
        pingPong = !pingPong;
      }

      smoothScrollY = THREE.MathUtils.damp(smoothScrollY, currentScrollY, 6.8, dt);
      const maxDocScroll = Math.max(
        document.documentElement.scrollHeight - vh,
        vh * 2
      );
      const globalScrollRatio = THREE.MathUtils.clamp(
        smoothScrollY / maxDocScroll,
        0,
        1
      );

      const pCover = THREE.MathUtils.clamp(smoothScrollY / vh, 0, 1);
      const pAbout = THREE.MathUtils.clamp(
        (smoothScrollY - vh * 0.72) / (vh * 1.15),
        0,
        1
      );
      const pGallery = THREE.MathUtils.clamp(
        (smoothScrollY - vh * 1.75) / (vh * 1.5),
        0,
        1
      );

      // Full-screen waterfall framing centered over cover; smoothly softens past cover
      const aboutEase = 1.0 - pAbout * 0.65;
      const galleryFade = 1.0 - pGallery * 0.92;
      const deepExit = THREE.MathUtils.clamp(
        1.0 - Math.max(0, globalScrollRatio - 0.3) / 0.14,
        0,
        1
      );
      const fade = THREE.MathUtils.clamp(
        aboutEase * galleryFade * deepExit,
        0,
        1
      );
      sharedUniforms.uFade.value = fade;

      const isVisible = fade > 0.01;
      container.style.visibility = isVisible ? 'visible' : 'hidden';

      if (isVisible) {
        sharedUniforms.uTime.value = reducedMotion ? 0 : elapsed;
        sharedUniforms.uFlowPhase.value = reducedMotion ? 0 : flowPhase;
        sharedUniforms.uMorphPhase.value = reducedMotion ? 0 : morphPhase;
        sharedUniforms.uTransitionImpulse.value = reducedMotion
          ? 0
          : currentTransitionImpulse;
        sharedUniforms.uIntroVeil.value = reducedMotion ? 0 : currentIntroVeil;
        sharedUniforms.uIntroPhase.value = reducedMotion ? 0 : introPhase;
        sharedUniforms.uScroll.value = pCover * 1.05 + pAbout * 0.95;
        sharedUniforms.uCursor.value.set(pointerScreenX, pointerScreenY);
        sharedUniforms.uCursorVel.value.set(cursorVelX, cursorVelY);
        sharedUniforms.uDragOffset.value.set(dragCurrentX, dragCurrentY);
        sharedUniforms.uDragActive.value = isDragging ? 1.0 : 0.0;

        // Aspect-adaptive full-bleed scaling across ultra-wide desktop to portrait mobile
        const widthScale = Math.max(0.86, aspect / 1.52);
        const heightScale = Math.max(1.0, 1.12 - pCover * 0.06);
        waterfallGroup.position.set(
          dragCurrentX * 0.14,
          -pCover * 0.42 - pAbout * 0.65 + dragCurrentY * 0.12,
          currentIntroVeil * 0.55 - pAbout * 0.85
        );
        waterfallGroup.scale.set(widthScale, heightScale, 1.0);

        silkCluster.rotation.y =
          (reducedMotion ? 0 : Math.sin(elapsed * 0.16) * 0.05) +
          Math.sin(introPhase * 0.85) * 0.16 * currentIntroVeil +
          currentTransitionImpulse * 0.11 +
          dragCurrentX * 0.14;
        silkCluster.rotation.x =
          (reducedMotion ? 0 : Math.cos(elapsed * 0.14) * 0.03) +
          Math.cos(introPhase * 0.72) * 0.08 * currentIntroVeil +
          currentTransitionImpulse * 0.06 -
          dragCurrentY * 0.1;
        silkCluster.rotation.z =
          -0.06 +
          Math.sin(morphPhase * 0.45) * 0.04 +
          Math.sin(introPhase * 0.55) * 0.07 * currentIntroVeil +
          currentTransitionImpulse * 0.05;

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = window.requestAnimationFrame(tick);
    }

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      document.body.style.cursor = '';
      window.dispatchEvent(
        new CustomEvent('fluid-sculpture-hover', {
          detail: { over: false, dragging: false },
        })
      );
      themeObserver.disconnect();

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener(
        'portfolio-carousel-transition',
        handleCarouselTransition
      );
      window.removeEventListener(
        'carousel-transition',
        handleCarouselTransition
      );
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      rtA?.dispose();
      rtB?.dispose();
      simQuadGeo?.dispose();
      simMaterial?.dispose();

      silkGeo.dispose();
      waterfallSilkMat.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[15] pointer-events-none select-none overflow-hidden"
    />
  );
};
