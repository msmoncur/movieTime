const input = document.querySelector('#search')
const button = document.querySelector('#submit')
const form = document.querySelector('#formy')
const resultsDiv = document.getElementById('results')

async function getMovie() { 
    const searchTerm = input.value.trim()
    if(!searchTerm) return

    try { 
        const response = await fetch (`/movie?search=${encodeURIComponent(searchTerm)}`)
        if (!response.ok) {
            throw newError(`Response status: ${response.status}`)
        }

        const data = await response.json()

        resultsDiv.innerHTML = ''

        if(data.error){
            resultsDiv.innerHTML  = `<p>${data.error}</p>`
        } else {
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
            
            data.results.forEach(movie => {
                    const movieElement = document.createElement('div')
                    movieElement.classList.add('movie')

                    const titleElement = document.createElement('p')
                    movieElement.textContent = movie.title

                    const posterElement = document.createElement('img')
                    if (movie.poster_path) {
                        posterElement.src = `${imageBaseUrl}${movie.poster_path}`
                    } else {
                        posterElement.src = 'https://via.placeholder.com/500x750?text=No+Image+Available'
                    }

                    movieElement.appendChild(titleElement)
                    movieElement.appendChild(posterElement)
                    resultsDiv.appendChild(movieElement)
                })
            }
        } catch (error) {
            console.error('Error: ', error)
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`
        }
    }

form.addEventListener("submit", (event) => {
    event.preventDefault()
    getMovie()
})