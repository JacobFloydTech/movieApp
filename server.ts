import express, { Express, Request, Response, query } from "express";
import type {Genre, CastCollection, FavouriteResult, ImagesResponse, MovieDiscover, MovieDiscoverResult, VideoCollection} from './types.d.ts'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

const headers = {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
  }

app.post('/discover', async (req: Request, res: Response) => { 
    const { page } = req.body

    const url = 'https://api.themoviedb.org/3/discover/movie';
    const request = await fetch(`${url}?page=${page}`, { headers });
    const response = await request.json();
    res.send(response)
})

app.post('/getMovie', async (req: Request, res: Response) => { 
    let { movie } = req.body;
    movie = movie.replaceAll('-', ' ');
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    const request = await fetch(`${searchUrl}?query=${movie}`, { headers });
    try { 
    const response = await request.json() as MovieDiscover;
    res.send(response.results[0]);
    } catch (error) { 
        res.send({error: 404})
    }

})

app.post('/search', async (req: Request, res: Response) => {
    const { query, page } = req.body;
    const url = 'https://api.themoviedb.org/3/search/movie';
    const request = await fetch(`${url}?query=${query}&page=${page}`, { headers });
    const response = await request.json();
    res.send(response);
})

app.post('/getLowResBackground', async (req: Request, res: Response) => { 
    const { id } = req.body;
    let url = `https://api.themoviedb.org/3/movie/${id}/images`;
    const request = await fetch(url, { headers });
    const response: ImagesResponse = await request.json();
    const lowResPoster = response.posters[0].file_path;
    return res.send({src: lowResPoster})
})
 
app.post('/getMovie', async (req: Request, res: Response) => { 
    const { movie } = req.body;

    const url = 'https://api.themoviedb.org/3/search/movie'
    const request = await fetch(`${url}?query=${movie}`, { headers });
    const { results } = await request.json() as MovieDiscover ;
    const data = results.filter((m) => { m.title == movie })[0];
    res.send({data})
})

app.post('/getImages', async (req: Request, res: Response) => { 
    const { id } = req.body;
    const imageUrl = `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en&language=en`
    const response = await fetch(imageUrl, { headers});
    res.send(await response.json())
})

app.post('/getCast', async (req: Request, res: Response) => { 
    const { id } = req.body;
    const url = `https://api.themoviedb.org/3/movie/${id}/credits`
    const request = await fetch(url, { headers });
    const response = await request.json() as CastCollection;
    response.cast.sort((a, b) => b.popularity-a.popularity)
    res.send(response)
})

app.post('/getMovieTrailer', async (req: Request, res: Response) => {
    const { id } = req.body;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const request = await fetch(url, { headers });
    const response = await request.json() as VideoCollection;
    var results =  response.results.filter((e) => e.type == 'Trailer')
    res.send(results[0]);
})

app.get('/getCategories', async (req: Request, res: Response) => { 
    const url = 'https://api.themoviedb.org/3/genre/movie/list'
    const request = await fetch(url, { headers });
    const {genres} = await request.json();
    res.send(genres)
})

app.post('/getReviews', async (req: Request, res: Response) => {
    const { id } = req.body;
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews`
    const request = await fetch(url, { headers });
    const response = await request.json();
    res.send(response)
})

app.post('/getRecommendations', async (req: Request, res: Response) => { 
    const { id } = req.body;
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`
    const request = await fetch(url, { headers });
    const response = await request.json();
    res.send(response)
})


app.get('/createRequestToken', async (req: Request, res: Response) => { 
    const url = 'https://api.themoviedb.org/3/authentication/token/new'
    const request = await fetch(url, { headers });
    const { request_token } = await request.json();
    res.send({token: request_token})
})

app.post('/createSessionID', async (req: Request, res: Response) => {
    const { token } = req.body;
    const url = `https://api.themoviedb.org/3/authentication/session/new`
    const request = await fetch(url, {
        method: "POST", headers,
        body: JSON.stringify({ request_token: token })
    });
    res.send(await request.json())
})

app.post('/getAccount', async (req: Request, res: Response) => { 
    const { sessionID, userID } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userID}?session_id=${sessionID}`;
    const request = await fetch(url, { headers });
    res.send(await request.json())
})

app.post('/addTo', async (req: Request, res: Response) => {
    const { accountID, sessionID, movieID, watchList } = req.body;
    if (!sessionID) { return}
    const url = `https://api.themoviedb.org/3/account/${accountID}/${watchList ? "watchlist" : 'favorite'}?session_id=${sessionID}`
    const contains = await fetch(`http://localhost:3000/contains${watchList ? "Watchlist" : "Favorite"}`, { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            movieID, accountID, sessionID
        })
    })
    const { result } = await contains.json();
    fetch(url, {headers,
        method: "POST",
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieID,
            [watchList ? "watchlist" : "favorite"]: !result
        })
    })
    res.send({result: !result})

})

app.post('/containsFavourite', async (req: Request, res: Response) => { 
    const { sessionID, movieID, accountID } = req.body; 

    const url = `https://api.themoviedb.org/3/account/${accountID}/favorite/movies?session_id=${sessionID}`;
    try { 
        const request = await fetch(url, {headers} );
        const response = await request.json() as FavouriteResult;
        const result = response.results.filter((e) => e.id == movieID)[0];
        res.send({result: !!result})
    } catch (e) { res.send({result: false})}

})

app.post('/containsWatchlist', async (req: Request, res: Response) => { 
    const { sessionID, movieID, accountID } = req.body; 

    const url = `https://api.themoviedb.org/3/account/${accountID}/watchlist/movies?session_id=${sessionID}`;
    try { 
        const request = await fetch(url, {headers} );
        const response = await request.json() as FavouriteResult;
        const result = response.results.filter((e) => e.id == movieID)[0]
        res.send({result: !!result})
    } catch (e) {res.send({result: false})}

})

app.post('/getFavourites', async (req: Request, res: Response) => { 
    const { sessionID, userID } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userID}/favorite/movies?session_id=${sessionID}`

    const request = await fetch(url, { headers, });
    res.send(await request.json());
})

app.post('/getFavourites', async (req: Request, res: Response) => { 
    const { sessionID, userID } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userID}/watchlist/movies?session_id=${sessionID}`

    const request = await fetch(url, { headers, });
    res.send(await request.json());
})


app.post('/getRatedMovies', async (req: Request, res: Response) => { 
    const { sessionID, userID } = req.body;
    const url = `https://api.themoviedb.org/3/account/${userID}/rated/movies?session_id=${sessionID}`
    const request = await fetch(url, { headers });
    res.send(await request.json());
})

app.post('/convertCategoriesToWords', async (req: Request, res: Response) => { 
    const { ids }: {ids: number[]}= req.body
    const url = 'https://api.themoviedb.org/3/genre/movie/list'
    const request = await fetch(url, { headers });
    let { genres }: {genres: Genre[]} = await request.json();
    let categories = genres.filter((e) => ids.includes(e.id)).map((e) => e.name);
    res.send({ categories  });
})

app.post('/getKeywords', async (req: Request, res: Response) => { 
    const { id } = req.body;
    const url = `https://api.themoviedb.org/3/movie/${id}/keywords`
    const request = await fetch(url, { headers });
    const { keywords } = await request.json();
    res.send({keywords})
})

app.post('/getBestOfCategory', async (req: Request, res: Response) => { 
    const { genre } = req.body;
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`;
    const request = await fetch(url, { headers });
    const results = await request.json();
    res.send({results})

})



app.listen(process.env.PORT, () => { 
    console.log("Running on", process.env.PORT);
})
