
// const retrieveData = async() => {
//     let resp =  await fetch("http://localhost:3000/geo_data_trees.geojson") //TODO: implement fetch from external server
//     //console.log(resp)
//     let data = await resp.json();
//     //console.log(data);
//     return data;
// }

//export const data = retrieveData().then(data => {return data})

const retrieveData = async() => {
    let resp = await fetch('http://localhost:3000/geo_data_trees.geojson')
    let data = await resp.json();
    return data
}

export {retrieveData}

// module.exports = global.config = retrieveData().then(data => {return data});
//     {
//         i18n: {
//             welcome: {
//                 en: "Welcome",
//                 fa: "خوش آمدید"
//             }
//             // rest of your translation object
//     }
//     // other global config variables you wish
// };