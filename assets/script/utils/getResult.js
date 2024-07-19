export const getResult = (marks, quizLength, ratings) => {
    if (quizLength < 4 || ratings.length < 4) {
        throw new Error('Invalid quiz length or ratings length');
    }

    const thresholds = [
        { min: Math.ceil(0.8 * quizLength), max: quizLength, rating: ratings[2] },
        { min: Math.ceil(0.6 * quizLength), max: Math.floor(0.79 * quizLength), rating: ratings[1] },
        { min: Math.ceil(0.4 * quizLength), max: Math.floor(0.59 * quizLength), rating: ratings[0] },
        { min: 0, max: Math.floor(0.39 * quizLength), rating: ratings[3] }
    ];

    for (const { min, max, rating } of thresholds) {
        if (marks >= min && marks <= max) {
            return rating;
        }
    }

    return ratings[3];
};