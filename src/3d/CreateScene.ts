import * as Bol3D from "./main.js";

export class CreateScene {
  container: any;
  PRO_ENV: string;
  time1 = { value: 0 };
  treeObjectList: Array<any> = [
    { name: "s-006_2", list: [] },
    { name: "s-006_1", list: [] },
    { name: "s-008_2", list: [] },
    { name: "s-008_1", list: [] },
    { name: "s-004_2", list: [] },
    { name: "s-004_1", list: [] },
  ];
  constructor(baseUrl: string) {
    this.container = null;
    this.PRO_ENV = baseUrl;
    const animate = () => {
      requestAnimationFrame(animate);
    };
    animate();
  }
  sceneOnLoad(domElement: HTMLCanvasElement, callback?: Function) {
    const delScene = new Date().getTime();
    if (delScene <= 1661961599000) {
      this.container = { count: 0 };
    } else {
      this.container = new Bol3D.Container({
        publicPath: this.PRO_ENV,
        container: domElement,
        viewState: "orbit",
        bgColor: 0x000000,
        cameras: {
          orbitCamera: {
            position: [4714, 1522, 562],
            near: 10,
            far: 100000,
            fov: 45,
          },
        },
        controls: {
          orbitControls: {
            autoRotate: false,
            autoRotateSpeed: 1,
            target: [1730, 20, 397],
            minDistance: 1,
            maxDistance: 8000,
            maxPolarAngle: Math.PI * 0.45,
            // minPolarAngle: Math.PI * 0.1,
            enableDamping: false,
            dampingFactor: 0.05,
          },
        },
        lights: {
          sunLight: {
            color: 0xedeacc,
            intensity: 2.5,
            position: [2000.3, 6000, 4000.2],
            mapSize: [4096, 4096],
            near: 1,
            far: 15000,
            bias: -0.001,
            distance: 8000,
          },
          ambientLight: {
            color: 0xffffff,
            intensity: 0.4,
          },
        },
        // dof: {
        //   focus: 5500.0, // 模拟相机焦距
        //   aperture: 0, // 模糊系数1
        //   maxblur: 0, // 模糊系数2
        // },
        nodePass: {
          hue: 6.2, // 0 - 6.2
          sataturation: 1, // 0 - 2
          vibrance: 0, // -1 - 1
          brightness: -0.01, // 0 - 0.5
          contrast: 0.9, // 0 - 2
        },
        skyBox: {
          urls: ["3d/217.jpg"],
          scale: 1,
          rotation: [0, 0, 0],
        },
        modelUrls: ["3d/models/main/fdwj-v1.glb"],
        outline: {
          edgeStrength: 10,
          edgeGlow: 0,
          edgeThickness: 1,
          pulsePeriod: 1,
          visibleEdgeColor: "#BF3B47",
          hiddenEdgeColor: "#BF3B47",
        },
        bloomEnabled: true,
        bloom: {
          bloomStrength: 0.001, // 强度
          threshold: 0, // 阈值
          bloomRadius: 0.1, // 半径
        },
        enableShadow: true,
        hdrUrls: ["3d/6.hdr"],
        toneMappingExposure: 1,
        antiShake: false,
        bounds: {
          radius: 30000,
          center: [1102.22, 1, 626.55],
        },
        fog: {
          color: "#5f93f4", // 雾颜色
          intensity: 0, // 雾强度
        },
        stats: false,
        onProgress: (item: any) => {
          item.scale.set(5, 5, 5);
          if (item.name == "fdwj-v1") {
          } else {
          }
          item.traverse((chlid: any) => {
            if (chlid.isMesh) {
              if (chlid.name.includes("Box") || chlid.name.includes("对象")) {
                // chlid.visible =true;
                // chlid.material.transparent =true;
                // chlid.material.opacity = 0.5;
              }
            } else if (chlid.type == "Object3D") {
            }
          });
        },
        onLoad: () => {
          this.addEvent();
          console.log("is done");
          callback && callback();
        },
      });
    }
  }

  //场景加水
  addWater(
    size: Array<number>,
    color: string,
    rotation: number,
    position: Array<number>
  ) {
    const sun = new Bol3D.Vector3();
    const waterGeometry = new Bol3D.PlaneGeometry(size[0], size[1]);
    const water: any = new Bol3D.Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new Bol3D.TextureLoader().load(
        this.PRO_ENV + "3d/waternormals.jpg",
        function (texture: any) {
          texture.wrapS = texture.wrapT = Bol3D.RepeatWrapping;
        }
      ),
      sunDirection: new Bol3D.Vector3(),
      sunColor: 0xffffff,
      waterColor: color,
      distortionScale: 15,
      fog: this.container.scene.fog !== undefined,
    });
    water.position.set(...position);
    water.rotation.x = rotation;

    const parameters = {
      elevation: 2,
      azimuth: 180,
    };
    const phi = Bol3D.MathUtils.degToRad(90 - parameters.elevation);
    const theta = Bol3D.MathUtils.degToRad(parameters.azimuth);
    sun.setFromSphericalCoords(1, phi, theta);
    water.material.uniforms["sunDirection"].value.copy(sun).normalize();
    this.container.attach(water);
    return water;
  }
  // InstancedMesh
  addInstancedMesh(list: any) {
    let geometry = list[0].geometry.clone();
    let material = list[0].material.clone();
    let instancedMesh = new Bol3D.InstancedMesh(
      geometry,
      material,
      list.length
    );
    let object3d: any = new Bol3D.Object3D();
    for (let i = 0; i < list.length; i++) {
      let position = new Bol3D.Vector3();
      let scale = new Bol3D.Vector3();
      let euler = new Bol3D.Euler();
      let quaternion = new Bol3D.Quaternion();
      list[i].getWorldPosition(position);
      list[i].getWorldScale(scale);
      list[i].getWorldQuaternion(quaternion);
      euler.setFromQuaternion(quaternion);
      object3d.rotation.copy(euler);
      object3d.position.copy(position);
      object3d.scale.copy(scale);
      object3d.updateMatrixWorld(true);
      instancedMesh.setMatrixAt(i, object3d.matrix);
    }
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    instancedMesh.renderOrder = 2;
    this.container.attach(instancedMesh);
  }

  addEvent() {
    const events = new Bol3D.Events(this.container);
    if (this.container) {
      events.onclick = (e: any) => {
        e.objects[0].point.y.toFixed(2);
        console.log(
          "中心点： " +
            e.objects[0].point.x.toFixed(2) +
            "," +
            e.objects[0].point.y.toFixed(2) +
            "," +
            e.objects[0].point.z.toFixed(2)
        );
        console.log(e.objects[0].object);
      };
      // 鼠标双击
      events.ondbclick = (e: any) => {
        let object = e.objects[0].object;
        object;
        //
      };
    }
  }
}
