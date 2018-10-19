document.addEventListener(`DOMContentLoaded`, () => {
  // NAME ALL THE BUTTONS
  let homeButton = document.getElementById(`homeButton`)
  let moviesButton = document.getElementById(`moviesButton`)
  // NAME ALL THE DIVS
  let homeDiv = document.getElementById(`homeDiv`)
  let tableDiv = document.getElementById(`tableDiv`)
  let inputFormDiv = document.getElementById(`inputFormDiv`)
  let tableBody = document.getElementById(`tableBody`)
  let form = document.getElementById('inputForm')
  let newButton = document.getElementById(`newButton`)
  let editFormDiv = document.getElementById(`editFormDiv`)
  let editForm = document.getElementById(`editForm`)
  let modal = document.getElementById(`viewModal`)
  let modalTitle = document.getElementById(`modal-title`)
  let modalBody = document.getElementById(`modal-body`)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    // grab all values from the form
    let postData = {}

    let formElements = event.target.elements

    for (let i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }
    // axios.post that data to the correct backend route
    axios.post('/movies', postData)
      .then((response) => {
        buildTable()
        form.reset()
        inputFormDiv.style.display = `none`
        tableDiv.style.display = `block`
      })
      .catch((error) => {
        console.log(`should be an error`, error);
      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    let movieId = document.getElementById(`id`).value
    // grab all values from the form
    let postData = {}

    let formElements = event.target.elements

    for (let i = 1; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }
    console.log(postData, movieId);
    // axios.post that data to the correct backend route
    axios.put(`/movies/${movieId}`, postData)
      .then((response) => {
        buildTable()
        editForm.reset()
        editFormDiv.style.display = `none`
        tableDiv.style.display = `block`
      })
      .catch((error) => {
        console.log(`should be an error`, error);
      })
  }
  // BUILDS A TABLE OF ALL MOVIES IN THE DATABASE
  const buildTable = () => {
    // clear out the movies tbody
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild)
    }
    axios.get(`/movies`)
      .then((movies) => {
        movies.data.forEach((movie) => {
          let tr = document.createElement(`tr`)
          let title = document.createElement(`td`)
          let director = document.createElement(`td`)
          let year = document.createElement(`td`)
          let rating = document.createElement(`td`)
          let deleteTd = document.createElement(`td`)
          let delButton = document.createElement(`button`)
          let editTd = document.createElement(`td`)
          let editButton = document.createElement(`button`)
          let viewTd = document.createElement(`td`)
          let viewButton = document.createElement(`button`)

          // Fills in the row's data
          title.innerText = movie.title
          director.innerText = movie.director
          year.innerText = movie.year
          rating.innerText = movie.rating

          // Add delete button to each row
          delButton.innerText = `Delete Movie`
          delButton.classList.add(`btn`)
          delButton.classList.add(`btn-danger`)
          delButton.setAttribute(`data-id`, movie.id)
          delButton.addEventListener(`click`, (event) => {
            let movieId = event.target.getAttribute('data-id')
            // DELETE THIS RECORD
            axios.delete(`/movies/${movieId}`)
              .then((response) => {
                event.target.parentElement.parentElement.remove()
              })
              .catch((err) => {
                throw err
              })
          })
          editButton.innerText = `Edit Movie`
          editButton.classList.add(`btn`)
          editButton.classList.add(`btn-warning`)
          editButton.setAttribute(`data-id`, movie.id)
          editButton.addEventListener(`click`, (event) => {
            editForm.reset()
            document.getElementById(`id`).value = event.target.getAttribute('data-id')
            tableDiv.style.display = `none`
            editFormDiv.style.display = `block`
          })
          viewButton.innerText = `View Movie`
          viewButton.classList.add(`btn`)
          viewButton.classList.add(`btn-success`)
          viewButton.setAttribute(`data-id`, movie.id)
          viewButton.setAttribute(`data-toggle`, `modal`)
          viewButton.setAttribute(`data-target`, `#viewModal`)
          viewButton.addEventListener(`click`, (event) => {
            let movieId = event.target.getAttribute('data-id')
            axios.get(`/movies/${movieId}`)
              .then((response) => {
                while (modalBody.firstChild) {
                  modalBody.removeChild(modalBody.firstChild)
                }
                console.log(response.data.title);
                modalTitle.innerText = response.data.title
                let img = document.createElement(`img`)
                img.src = response.data.poster_url
                modalBody.appendChild(img)
              })
          })
          tr.appendChild(title)
          tr.appendChild(director)
          tr.appendChild(year)
          tr.appendChild(rating)
          viewTd.appendChild(viewButton)
          tr.appendChild(viewTd)
          editTd.appendChild(editButton)
          tr.appendChild(editTd)
          deleteTd.appendChild(delButton)
          tr.appendChild(deleteTd)
          tableBody.appendChild(tr)
        })
      })
      .catch((err) => {
        throw err
      })
  }
  // HANDLES ALL CLICKS ON THE NAV BUTTONS
  const navButtonClicked = (event) => {
    switch (event.target.id) {
      case `homeButton`:
        // Hide the other divs and show the correct one.
        homeDiv.style.display = `block`
        tableDiv.style.display = `none`
        inputFormDiv.style.display = `none`
        editFormDiv.style.display = `none`
        break;
      case `moviesButton`:
        // Hide the other divs and show the correct one.
        homeDiv.style.display = `none`
        tableDiv.style.display = `block`
        inputFormDiv.style.display = `none`
        editFormDiv.style.display = `none`
        buildTable();
        break;
      default:
        console.log(`default`);
    }
  }

  // HANDLE ALL CLICKS ON THE NEW BUTTONS
  const newButtonClicked = (event) => {
    homeDiv.style.display = `none`
    tableDiv.style.display = `none`
    inputFormDiv.style.display = `block`
  }
  // ADD EVENTLISTENERS
  // homeButton addEventListener
  homeButton.addEventListener(`click`, navButtonClicked)
  // moviesButton addEventListener
  moviesButton.addEventListener(`click`, navButtonClicked)
  // newButton addEventListener
  newButton.addEventListener(`click`, newButtonClicked)
  // form addEventListener
  inputForm.addEventListener(`submit`, handleFormSubmit)
  // editForm addEventListener
  editForm.addEventListener(`submit`, handleEditSubmit)

  // axios.get(`/movies`)
  //   .then(result => console.log(result))
})