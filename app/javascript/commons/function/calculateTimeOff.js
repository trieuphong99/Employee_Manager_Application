const calculateTimeOff = data => `${Math.floor(data)}h:${Math.floor((data - Math.floor(data)) * 60)}m`
export default calculateTimeOff;
