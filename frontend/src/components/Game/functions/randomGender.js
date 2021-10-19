export const randomGender = () => {
    return ~~(Math.random() * 10) % 2 === 0 ? 'male' : 'female';
};
