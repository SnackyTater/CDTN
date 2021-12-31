const ageCalulator = (dob) => {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const dobCalculator = (dob) => {
    let diff = new Date(Date.now() - dob*31536000000);
    return diff.toISOString();
}

const generateCode = (stringLength) => {
    let code = ''
    for(let index = 0; index <= stringLength; index++){
        code += Math.floor(Math.random() * 9);
    }
    return code;
}

const calculateDistance = (userCoordinates, targetCoordinates) => {
    const earthRadius = 6.317;

    const userLong = userCoordinates[0];
    const targetLong = targetCoordinates[0];

    let userLat = userCoordinates[1];
    let targetLat = targetCoordinates[1];
    

    //distance between lats & long
    const deltaLat = (targetLat - userLat) * Math.PI / 180;
    const deltaLong = (targetLong - userLong) * Math.PI / 180;

    //conver lat to radian
    userLat = userLat * Math.PI / 180;
    targetLat = targetLat * Math.PI / 180;

    const haversine = Math.pow(Math.sin(deltaLat / 2), 2) + Math.pow(Math.sin(deltaLong / 2), 2) * Math.cos(userLat) * Math.cos(targetLat);

    const distance = 2 * Math.asin(Math.sqrt(haversine));

    return distance * earthRadius;
}
module.exports = {
    ageCalulator,
    dobCalculator,
    generateCode,
    calculateDistance
}