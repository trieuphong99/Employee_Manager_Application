const calculateTimeWork = data => `${Math.floor(data)}h:${Math.ceil((data - Math.floor(data)) * 60)}m`
export default calculateTimeWork;
