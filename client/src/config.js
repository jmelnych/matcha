export const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        return location.protocol + '//' + location.host;
    }
};