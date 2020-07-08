// import {
//   Drawings,
//   Groups,
//   GroupsData,
//   Items,
//   ItemsData,
//   Layers,
//   LayersData,
//   Users,
// } from '../interfaces';

// export const users: Users = {
//   otIF0GKv8ZKw03F1ya: {
//     id: 'otIF0GKv8ZKw03F1ya',
//     drawings: {
//       xpIF0GKv8ZKw03FwwryaL: true,
//     },
//   },
// };

// export const drawings: Drawings = {
//   xpIF0GKv8ZKw03FwwryaL: {
//     id: 'xpIF0GKv8ZKw03FwwryaL',
//     users: {
//       otIF0GKv8ZKw03F1ya: true,
//     },
//     // layers: {
//     //   Gw3G78tUYzC5OSdswcyyt: true,
//     // },
//     items: {
//       '25Bi8tbn2ZQAla7ekHzVA': true,
//       XHZloW8HBGp9NsJFauKQz: true,
//       f2BWKOCzuEJsoMX6MV4Sa: true,
//     },
//   },
// };

// export const layers: Layers = {
//   Gw3G78tUYzC5OSdswcyyt: {
//     id: 'Gw3G78tUYzC5OSdswcyyt',
//     user: 'otIF0GKv8ZKw03F1ya',
//     drawing: 'xpIF0GKv8ZKw03FwwryaL',
//     groups: {
//       EONvmlMWHR6PEQXsIZx3D: true,
//     },
//   },
// };

// export const layersData: LayersData = {
//   Gw3G78tUYzC5OSdswcyyt: [
//     'Layer',
//     {
//       name: 'PAWMiglUFh4_vH1xFGpny',
//       applyMatrix: true,
//     },
//   ],
// };

// export const groups: Groups = {
//   EONvmlMWHR6PEQXsIZx3D: {
//     id: 'EONvmlMWHR6PEQXsIZx3D',
//     user: 'otIF0GKv8ZKw03F1ya',
//     drawing: 'xpIF0GKv8ZKw03FwwryaL',
//     layer: 'Gw3G78tUYzC5OSdswcyyt',
//     items: {
//       '25Bi8tbn2ZQAla7ekHzVA': true,
//       XHZloW8HBGp9NsJFauKQz: true,
//       f2BWKOCzuEJsoMX6MV4Sa: true,
//     },
//   },
// };

// // export const groupsData: GroupsData = {
// //   EONvmlMWHR6PEQXsIZx3D: [
// //     'Group',
// //     {
// //       name: 'GJkWFKTahRKWuLTGC-cG6',
// //       applyMatrix: true,
// //     },
// //   ],
// // };
// export const groupsData: GroupsData = {
//   EONvmlMWHR6PEQXsIZx3D: [
//     'Group',
//     { name: 'MHLsRcu7bn2-1hOoM3C6V', applyMatrix: true },
//   ],
// };

// export const items: Items = {
//   '25Bi8tbn2ZQAla7ekHzVA': {
//     id: '25Bi8tbn2ZQAla7ekHzVA',
//     // user: 'otIF0GKv8ZKw03F1ya',
//     drawing: 'xpIF0GKv8ZKw03FwwryaL',
//     // layer: 'Gw3G78tUYzC5OSdswcyyt',
//     // group: 'EONvmlMWHR6PEQXsIZx3D',
//   },
//   XHZloW8HBGp9NsJFauKQz: {
//     id: 'XHZloW8HBGp9NsJFauKQz',
//     // user: 'otIF0GKv8ZKw03F1ya',
//     drawing: 'xpIF0GKv8ZKw03FwwryaL',
//     // layer: 'Gw3G78tUYzC5OSdswcyyt',
//     // group: 'EONvmlMWHR6PEQXsIZx3D',
//   },
//   f2BWKOCzuEJsoMX6MV4Sa: {
//     id: 'f2BWKOCzuEJsoMX6MV4Sa',
//     // user: 'otIF0GKv8ZKw03F1ya',
//     drawing: 'xpIF0GKv8ZKw03FwwryaL',
//     // layer: 'Gw3G78tUYzC5OSdswcyyt',
//     // group: 'EONvmlMWHR6PEQXsIZx3D',
//   },
// };

// export const itemsData: ItemsData = {
//   '25Bi8tbn2ZQAla7ekHzVA': [
//     'Path',
//     {
//       name: '25Bi8tbn2ZQAla7ekHzVA',
//       applyMatrix: true,
//       segments: [
//         [
//           [276, 162],
//           [0, 0],
//           [0, -8.8719],
//         ],
//         [
//           [276, 136],
//           [-4.45972, 8.91943],
//           [9.20511, -18.41022],
//         ],
//         // [
//         //   [322, 115],
//         //   [-18.43775, 0],
//         //   [4.38054, 0],
//         // ],
//         // [
//         //   [338, 116],
//         //   [-3.8748, -2.32488],
//         //   [8.21676, 4.93005],
//         // ],
//         // [
//         //   [361, 158],
//         //   [5.2568, -10.5136],
//         //   [-2.07289, 4.14578],
//         // ],
//         // [
//         //   [329, 163],
//         //   [3.96931, 3.96931],
//         //   [-13.24667, -13.24667],
//         // ],
//         // [
//         //   [345, 126],
//         //   [-14.90124, 3.72531],
//         //   [33.05416, -8.26354],
//         // ],
//         // [
//         //   [442, 139],
//         //   [-32.83087, 16.41544],
//         //   [8.08299, -4.04149],
//         // ],
//         // [
//         //   [470, 122],
//         //   [-2.80717, 11.2287],
//         //   [2.34892, -9.39566],
//         // ],
//         // [
//         //   [446, 110],
//         //   [5.98838, 1.19768],
//         //   [-5.43955, -1.08791],
//         // ],
//         // [
//         //   [423, 112],
//         //   [4.5597, -3.0398],
//         //   [-8.60053, 5.73369],
//         // ],
//         // [
//         //   [415, 154],
//         //   [-4.93063, -9.86127],
//         //   [4.80425, 9.60849],
//         // ],
//         // [
//         //   [439, 165],
//         //   [-8.18171, -2.04543],
//         //   [19.24039, 4.8101],
//         // ],
//         // [
//         //   [501, 151],
//         //   [-13.19167, 13.19167],
//         //   [0, 0],
//         // ],
//       ],
//       strokeColor: [0.40784, 0.82745, 0.56863],
//       strokeWidth: 6,
//     },
//   ],
//   XHZloW8HBGp9NsJFauKQz: [
//     'Shape',
//     {
//       name: 'XHZloW8HBGp9NsJFauKQz',
//       applyMatrix: false,
//       matrix: [1, 0, 0, 1, 276, 162],
//       type: 'ellipse',
//       size: [6, 6],
//       radius: [3, 3],
//       fillColor: [0.40784, 0.82745, 0.56863],
//       strokeColor: [0.40784, 0.82745, 0.56863],
//     },
//   ],
//   f2BWKOCzuEJsoMX6MV4Sa: [
//     'Shape',
//     {
//       name: 'f2BWKOCzuEJsoMX6MV4Sa',
//       applyMatrix: false,
//       matrix: [1, 0, 0, 1, 501, 151],
//       type: 'ellipse',
//       size: [6, 6],
//       radius: [3, 3],
//       fillColor: [0.40784, 0.82745, 0.56863],
//       strokeColor: [0.40784, 0.82745, 0.56863],
//     },
//   ],
// };
