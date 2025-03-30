exports.checkHealthStatus = (record) => {
    let alerts = [];

    if (record.bloodPressure && record.bloodPressure !== 'N/A') {
        const [systolic, diastolic] = record.bloodPressure.split('/').map(Number);
        if (systolic > 140 || diastolic > 90) {
            alerts.push('High Blood Pressure detected!');
        }
    }
    
    if (record.heartRate < 50 || record.heartRate > 100) {
        alerts.push('Abnormal Heart Rate detected!');
    }
    
    if (record.temperature > 38) {
        alerts.push('High Temperature detected! Possible fever.');
    }
    
    if (record.sleepHours < 4) {
        alerts.push('Very low sleep detected! Consider getting more rest.');
    }
    
    if (record.sugarLevel > 200) {
        alerts.push('High blood sugar detected! Possible diabetes risk.');
    } else if (record.sugarLevel < 70) {
        alerts.push('Low blood sugar detected! Possible hypoglycemia risk.');
    }

    return alerts;
};
