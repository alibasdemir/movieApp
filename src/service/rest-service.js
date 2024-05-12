const BASE_URL = 'https://api.themoviedb.org/3';

const restService = async (url) => {
    try {
        const response = await fetch(BASE_URL + url, {
            method: 'GET',
            headers: { 
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDAxNmNkMzc4YzBiZGM5ODFjMGJmNDNhNTNhMWIxZSIsInN1YiI6IjY2M2JmNzJhNDdhODA4YTcxOGE4ZThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2TYpTln4aMJL4a1Bh1JS7EGkJuFRz86v4ibfAXj9djo'
            }
        });
        if (!response.ok) {
            throw new Error('Hata APIden veri alınamadı');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Hata: ', error);
        throw error;
    }
};

export default restService;
