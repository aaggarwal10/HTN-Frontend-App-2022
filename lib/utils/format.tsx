/**
 * Format date to be in written in the following format: Sep 11, 2022
 * @param {Date} date date to be formatted
 * @returns {string} formatted verbose date
 */
export const formatDateVerbose = (date: Date): string => {
    const localeDateString = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: 'numeric',
    });
    const parts = localeDateString.split(',');
    return parts[0] + ', ' + parts[1];
}

/**
 * Format date to be in written in the following format: Sep 11, 2022
 * @param {Date} date date to be formatted
 * @returns {string} formatted verbose date
 */
export const formatTimeVerbose = (date: Date): string => {
    const localeDateString = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: 'numeric',
    });
    const parts = localeDateString.split(',');
    return parts[parts.length - 1];
}

/**
 * Format date to be in written in the following format: Sep 11, 2022
 * @param {Date} date date to be formatted
 * @returns {string} formatted verbose date
 */
export const formatDateTimeVerbose = (date: Date): string => {
    const localeDateString = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: 'numeric',
    });
    return localeDateString;
}