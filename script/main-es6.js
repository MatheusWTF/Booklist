class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book){
    const list = document.querySelector('#book-list');
    //Create row
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    //Append to List
    list.appendChild(row);
  }

  showAlert(msg, className){
    //Create Div
    const alert = document.createElement('div');
    //Add ClassName
    alert.className = `alert ${className}`;
    //Add Text
    alert.appendChild(document.createTextNode(msg));
    //Get Parent
    const container = document.querySelector('.container'), 
          form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(alert, form);
    //Set Timeout
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.querySelector('#title').value = '',
    document.querySelector('#author').value = '',
    document.querySelector('#isbn').value = '';
  }
}

//Event Listener Book Submit
document.querySelector('#book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
  //Instantiate a new Book
  const book = new Book(title, author, isbn);
  //Instantiate UI
  const ui = new UI();
  //Validate
  if(title === '' || author === '' || isbn === ''){
    //Error Alert
    ui.showAlert('Please fill in all Fields.', 'error');
  }else{
    //Add book to list
    ui.addBook(book);
    //Success Alert
    ui.showAlert('Book added.', 'success');
    //Clear Fields
    ui.clearFields();
  }
  
  //Prevent Submit Action
  e.preventDefault();
})

//Event Listener Book Delete
document.querySelector('#book-list').addEventListener('click', function (e) {
  //Instantiate UI
  const ui = new UI();
  //Remove
  ui.deleteBook(e.target);
  //Show Alert
  ui.showAlert('Book Removed.', 'success');
  e.preventDefault();
})