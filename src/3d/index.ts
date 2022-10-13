import {CreateScene} from './CreateScene'

const  baseUrl = "/3dModel/";
// const  baseUrl = "https://www.kantu3d.com/demo/2209/FDTG/3dModel/";
let scene = new CreateScene(baseUrl)

export const addScene =(domElement: HTMLCanvasElement, callback?: Function)=>{
    scene.sceneOnLoad(domElement,callback)
}


