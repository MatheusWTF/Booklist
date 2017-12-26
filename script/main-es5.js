//Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI(){}
//Add Book to List
UI.prototype.addBook = function (book) {
  const list = document.getElementById('book-list');
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
//Show Alert
UI.prototype.showAlert = function (msg, className) {
  //Create Div
  const alert = document.createElement('div');
  //Add ClassName
  alert.className = `alert ${className}`;
  //Add Text
  alert.appendChild(document.createTextNode(msg));
  //Get Parent
  const container = document.querySelector('.container'), form = document.getElementById('book-form');
  //Insert Alert
  container.insertBefore(alert, form);
  //Set Timeout
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

}
//Delete Book
UI.prototype.deleteBook = function (target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '',
  document.getElementById('author').value = '',
  document.getElementById('#isbn').value = '';
}

//Event Listener Book Submit
document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
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
document.getElementById('book-list').addEventListener('click', function (e) {
  //Instantiate UI
  const ui = new UI();
  //Remove
  ui.deleteBook(e.target);
  //Show Alert
  ui.showAlert('Book Removed.', 'success');
  e.preventDefault();
})